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
(async () => {
    await driver.get("https://www.google.com");
    await driver.wait(until.titleIs("Google"));
    const login = await driver.findElement(By.id("iashplogo"));
    await login.click();
})();
