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

console.log(__dirname)
console.log("123")
console.log(process.cwd())
let filepath = path.join("file:\/\/", __dirname, "test", "index-local.html")
console.log(filepath)

const driver = builder.build();
(async () => {
    // await driver.get("https://www.google.com");
    await driver.get(filepath);
    // await driver.get("file:///home/test/workspace/github/test/test/test/index-local.html");
    // await driver.wait(until.titleIs("Google"));
    // const login = await driver.findElement(By.id("gbqfbb"));
    // await login.click();
})();
