const Builder = require("./node_modules/selenium-webdriver").Builder;
const By = require("./node_modules/selenium-webdriver").By;
const until = require("./node_modules/selenium-webdriver").until;
const Chrome = require("./node_modules/selenium-webdriver/chrome");
const csv = require("./node_modules/fast-csv");
const execSync = require("child_process").execSync;
const fs = require("fs");
const os = require("os");
require("chromedriver");

var outputPath = "./output";
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
}

var htmlPath = outputPath + "/report-check-result.html";

var htmlStream = fs.createWriteStream(htmlPath, {flags: "a"});
var csvStream = csv.createWriteStream({headers: true}).transform(function(row) {return {
    "Feature": row.Feature,
    "Case Id": row.CaseId,
    "Test Case": row.TestCase,
    "BaseLine(Mac-MPS)": row.BLMMPS,
    "CheckResult(Mac-MPS)": row.CRMMPS,
    "BaseLine(Mac-BNNS)": row.BLMBNNS,
    "CheckResult(Mac-BNNS)": row.CRMBNNS,
    "BaseLine(Mac-WASM)": row.BLMWASM,
    "CheckResult(Mac-WASM)": row.CRMWASM,
    "BaseLine(Mac-WebGL2)": row.BLMWebGL2,
    "CheckResult(Mac-WebGL2)": row.CRMWebGL2,
    "BaseLine(Android-NNAPI)": row.BLANNAPI,
    "CheckResult(Android-NNAPI)": row.CRANNAPI,
    "BaseLine(Android-WASM)": row.BLAWASM,
    "CheckResult(Android-WASM)": row.CRAWASM,
    "BaseLine(Android-WebGL2)": row.BLAWebGL2,
    "CheckResult(Android-WebGL2)": row.CRAWebGL2,
    "BaseLine(Windows-clDNN)": row.BLWclDNN,
    "CheckResult(Windows-clDNN)": row.CRWclDNN,
    "BaseLine(Windows-WASM)": row.BLWWASM,
    "CheckResult(Windows-WASM)": row.CRWWASM,
    "BaseLine(Windows-WebGL2)": row.BLWWebGL2,
    "CheckResult(Windows-WebGL2)": row.CRWWebGL2,
    "BaseLine(Linux-clDNN)": row.BLLclDNN,
    "CheckResult(Linux-clDNN)": row.CRLclDNN,
    "BaseLine(Linux-WASM)": row.BLLWASM,
    "CheckResult(Linux-WASM)": row.CRLWASM,
    "BaseLine(Linux-WebGL2)": row.BLLWebGL2,
    "CheckResult(Linux-WebGL2)": row.CRLWebGL2
}});

var csvFilePath = outputPath + "/report-check-result.csv";
csvStream.pipe(fs.createWriteStream(csvFilePath));

var remoteURL, driver, backendModel, chromeOption, command, androidSN, loadPageCount, adbPath, htmlPath;
var backendModels = [
    "Mac-MPS",
    "Mac-BNNS",
    "Mac-WASM",
    "Mac-WebGL2",
    "Android-NNAPI",
    "Android-WASM",
    "Android-WebGL2",
    "Windows-clDNN",
    "Windows-WASM",
    "Windows-WebGL2",
    "Linux-clDNN",
    "Linux-WASM",
    "Linux-WebGL2"
];

var chromiumPath = '';
var testPlatform = 'linux';

var baselinejson = JSON.parse(fs.readFileSync("./baseline/baseline.config.json"));
var versionChromium = baselinejson.Version.chromium;
var versionPolyfill = baselinejson.Version.polyfill;

var sys = os.type();


driver = new Builder()
	.forBrowser("chrome")
	.setChromeOptions("no-sandbox")
	.build();
await driver.get("https://www.baidu.com")





