// require("../lib/WMLTP-init.js");
const path = require("path");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const until = webdriver.until;
const By = webdriver.By;
const options = new chrome.Options();
options.addArguments("no-sandbox");
const builder = new webdriver.Builder();
builder.forBrowser("chrome");
builder.setChromeOptions(options);
const driver = builder.build();

const csv = require("./node_modules/fast-csv");
const fs = require("fs");
const os = require("os");

var countPasses = 0;
var countFailures = 0;
var countPending = 0;
var flagPending = null;

var csvTitle = null;
var csvModule = null;
var csvName = null;
var csvPass = null;
var csvFail = null;
var csvNA = null;
var csvExecution = "auto";
var csvSuite = "tests";

// var remoteURL = MODULE_JSON.getTestCaseURL() + "?backend=" + WEBML_BACKEND;
let baselinejson = JSON.parse(fs.readFileSync("./baseline/baseline.config.json"));

let sys = os.type();
if (sys == "Linux") {
    PLATFORM = "Linux";
} else if (sys == "Darwin") {
    PLATFORM = "Mac";
} else if (sys == "Windows_NT") {
    PLATFORM = "Windows"
} else {
    let string = "We do not support " + sys + " as run platform";
    throw new Error(string);
}

(async function() {
    var getName = async function(element) {
        let Text = null;
        let length = 0;
        await element.findElement(By.xpath("./h2")).getText()
            .then(function(message) {
            length = message.length - 1;
            Text = message;
        });

        let arrayElement = await element.findElements(By.xpath("./h2/child::*"));
        for (let j = 1; j <= arrayElement.length; j++) {
            await arrayElement[j - 1].getText()
                .then(function(message) {
                length = length - message.length;
            });
        }

        if (flagPending) {
            return Text;
        } else {
            return Text.slice(0, length);
        }
    }

    var getError = async function(element) {
        let Text = await element.findElement(By.xpath("./pre[@class='error']")).getText();

        return Text;
    }

    var getCode = async function(element) {
        let Text = await element.findElement(By.xpath("./pre[last()]")).getText();
        return Text;
    }

    var getInfo = async function(element) {
        let array = await element.findElements(By.xpath("./ul/li[@class='test pass fast' or @class='test pass slow' or @class='test fail' or @class='test pass pending' or @class='test pass medium']"));

        for (let i = 1; i <= array.length; i++) {
            await array[i - 1].getAttribute("class")
                .then(function(message) {
                if (message == "test pass pending") {
                    flagPending = true;
                } else {
                    flagPending = false;
                }
            });

            await getName(array[i - 1])
                .then(function(message) {
                csvName = message;
                // console.log("       " + i + ") " + message);
            });

            if (flagPending) {
                csvPass = null;
                csvFail = null;
                csvNA = "1";
                countPending++;
                // console.log("           Test pass pending!");
            } else {
                await getError(array[i - 1])
                    .then(function(message) {
                    csvPass = null;
                    csvFail = "1";
                    csvNA = null;
                    countFailures++;
                    // console.log("           Test failed!");
                }).catch(function(error) {
                    csvPass = "1";
                    csvFail = null;
                    csvNA = null;
                    countPasses++;
                    // console.log("           Test passed!");
                });
            }

            if (csvModule == null) {
                csvModule = csvTitle;
            }

            let DataFormat = {
                Feature: csvTitle,
                CaseId: csvModule + "/" + i,
                TestCase: csvName,
                Pass : csvPass,
                Fail: csvFail,
                NA: csvNA,
                ExecutionType: csvExecution,
                SuiteName: csvSuite
            };
            console.log(DataFormat);
            console.log("this is line 112---")
            // await MODULE_CSV.write(DataFormat);

            csvName = null;
            csvPass = null;
            csvFail = null;
            csvNA = null;
        }
    }

    var check = async function() {
        await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='passes']//em")).getText()
            .then(function(message) {
            let getPasses = message;
            console.log("    Web passes: " + getPasses);
            console.log("  Check passes: " + countPasses);

            if (getPasses != countPasses) {
                throw new Error("It's wrong to passed result!");
            }
        });

        await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='failures']//em")).getText()
            .then(function(message) {
            let getFailures = message;
            console.log("  Web failures: " + getFailures);
            console.log("Check failures: " + countFailures);

            if (getFailures != countFailures) {
                throw new Error("It's wrong to failed result!");
            }
        });

        console.log("       Pending: " + countPending);
        console.log("         TOTAL: " + (countPasses + countFailures + countPending));

        await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='duration']//em")).getText()
            .then(function(message) {
            let Duration = message;
            console.log("      Duration: " + Duration + " ms");
        });
    }

    var grasp = async function() {
        // mocha-report
        let arrayTitles = await driver.findElements(By.xpath("//ul[@id='mocha-report']/li[@class='suite']"));
        for (let i = 1; i <= arrayTitles.length; i++) {
            await arrayTitles[i - 1].findElement(By.xpath("./h1/a")).getText()
                .then(function(message) {
                csvTitle = message;
                csvModule = null;
                // console.log(i + ": " + csvTitle);
            });

            let arrayModule = await arrayTitles[i - 1].findElements(By.xpath("./ul/li[@class='suite']"));
            for (let j = 1; j <= arrayModule.length; j++) {
                await arrayModule[j - 1].findElement(By.xpath("./h1/a")).getText()
                    .then(function(message) {
                    let array = message.split("#");
                    csvModule = array[1];
                    // console.log("    #" + j + ": " + csvModule);
                });

                await getInfo(arrayModule[j - 1]);
            }

            await getInfo(arrayTitles[i - 1]);
        }
        // mocha-stats
        await check();
    }

    var testResult = async function() {
        console.log("open csv file");
        // await MODULE_CSV.open();

        // console.log( "open URL: " + remoteURL);
        // await MODULE_CHROME.setBrowserNewest(true);
        // await MODULE_CHROME.create();
        // await MODULE_CHROME.open(remoteURL);
        let testlink = path.join("file:\/\/", __dirname, "test", "index-local.html?backend=webgl2");
        await driver.get(testlink);
        for (let i = 0; i <= 60; i++) {
          let time_begin = await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='duration']//em")).getText();
          await driver.sleep(5000);
          let time_end = await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='duration']//em")).getText();
          if (time_begin === time_end) {
            break;
          }
        }

        console.log( "start grasping test result");
        await grasp();

        console.log( "finish grasping test result");
        // await MODULE_CSV.close();
        // await MODULE_CHROME.close();
    }

    // for (let x in TARGET_PLATFORMS) {
        // TEST_PLATFORM = TARGET_PLATFORMS[x];
        await testResult();
        // await MODULE_TOOLS.uninstallChromium();
    // }
})().then(function() {
    console.log("Grasping test result is completed!");
}).catch(function(err) {
    throw err;
});
