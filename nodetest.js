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

let countPasses = 0;
let countFailures = 0;
let countPending = 0;
let flagPending = null;

let csvTitle = null;
let csvModule = null;
let csvName = null;
let csvPass = null;
let csvFail = null;
let csvNA = null;
let csvExecution = "auto";
let csvSuite = "tests";

(async () => {
    let getName = async function(element) {
        console.log("this is function 'getName()' --------------\n")
        let Text = null;
        let length = 0;
        await element.findElement(By.xpath("./h2")).getText()
            .then(function(message) {
                length = message.length -1;
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

    let getError = async function(element) {
        let Text = await element.findElement(By.xpath("./pre[@class='error']")).getText();
        return Text;
    }

    let getCode = async function(element) {
        let Text = await element.findElement(By.xpath("./pre[last()]")).getText();
        return Text;
    }

    let getInfo = async function(element) {
        console.log("this is function 'getInfo()' --------------\n")
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
            console.log(DataFormat)
            csvName = null;
            csvPass = null;
            csvFail = null;
            csvNA = null;
        }
    }
    let check = async function() {
        console.log("this is function 'check()' --------------\n")
        await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='passes']//em")).getText()
            .then(function(message) {
            let getPasses = message;
            console.log(getPasses);
            console.log("--------");
            console.log(countPasses);
            if (getPasses != countPasses) throw new Error("It's wrong to passed result!");
            });
        await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='failures']//em")).getText()
            .then(function(message) {
            let getFailures = message;
            if (getFailures != countFailures) throw new Error("It's wrong to failed result!");
        });
        await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='duration']//em")).getText()
            .then(function(message) {
            let Duration = message;
            console.log("      Duration: " + Duration + " ms");
        });

    }
    let grasp = async function() {
        console.log("this is function 'grasp()' --------------\n")
        let arrayTitles = await driver.findElement(By.xpath("//ul[@id='mocha-report']/li[@class='suite']"));
        for (let i = 1; i <= arrayTitles.length; i++) {
            await arrayTitles[i -1].findElement(By.xpath("./h1/a")).getText()
                .then(function(message) {
                csvTitle = message;
                csvModule = null;
            });
            let arrayModule = await arrayTitles[i - 1].findElement(By.xpath("./ul/li[@class='suite']"));
            for (let j = 1; j <= arrayModule.length; j++) {
                await arrayModule[j - 1].findElement(By.xpath("./h1/a")).getText()
                    .then(function(message) {
                        let array = message.split("#");
                        csvModule = array[1];
                    });
                    await getInfo(arrayModule[j -1]);
            }
            await getInfo(arrayTitles[i -1]);
        }
        // await check();
    }
    let testlink = path.join("file:\/\/", __dirname, "test", "index-local.html")
    await driver.get(testlink);
    // await driver.get("https://brucedai.github.io/nt/test/index-local.html");
    // await driver.wait(until.titleIs("TweetDeck"));
    // const login = await driver.findElement(By.css("form.form-login a.btn"));
    // await login.click();
    for (let i = 0; i <= 60; i++) {
        let time_begin = await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='duration']//em")).getText();
        await driver.sleep(5000)
        let time_end = await driver.findElement(By.xpath("//ul[@id='mocha-stats']/li[@class='duration']//em")).getText();
        if (time_begin === time_end) break;
    }
    await grasp();
})();