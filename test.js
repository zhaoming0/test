const path = require("path");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");

const csv = require("fast-csv");
const os = require("os");

const until = webdriver.until;

const options = new chrome.Options();
options.addArguments("no-sandbox");

const builder = new webdriver.Builder();
builder.forBrowser("chrome");
builder.setChromeOptions(options);

let testlink = path.join("file:\/\/", __dirname, "test", "index-local.html")

console.log(os.type())
const driver = builder.build();
(async () => {
    // await driver.get("https://www.google.com");
    // await driver.get(testlink);
    await MODULE_CHROME.open(testlink);
    // await driver.get("file:///home/test/workspace/github/test/test/test/index-local.html");
    // await driver.wait(until.titleIs("Google"));
    // const login = await driver.findElement(By.id("gbqfbb"));
    // await login.click();
})();

class chrome_module {
    constructor() {
        this.builder = require("./node_modules/selenium-webdriver").Builder;
        this.by = require("./node_modules/selenium-webdriver").By;
        this.key = require("./node_modules/selenium-webdriver").Key;
        this.until = require("./node_modules/selenium-webdriver").Until;
        this.chrome = require("./node_modules/selenium-webdriver/chrome");
        this.driver;
        this.options;
        this.browserPath;
        this.browserNewest = false;
    }
    async open(URL) {
        await this.driver.get(URL);
    }
    async wait(times) {
        await this.driver.sleep(times);
    }
    async close() {
        await this.driver.close();
    }
}
MODULE_CHROME = new chrome_module;
class module_csv {
    constructor() {
        this.csv = require("./node_modules/fast-csv");
        this.csvStream;
    }
    async write(data) {
        await this.csvStream.write(data);
    }
    async close() {
        await this.csvStream.end();
    }
}
MODULE_CSV = new module_csv;
