'use strict';

exports.getSource = async (url, waitForElement) => {
    var webdriver = require('selenium-webdriver');
    const by = webdriver.By;
    const until = webdriver.until;
    var chrome = require('selenium-webdriver/chrome');
    var builder = new webdriver.Builder().forBrowser('chrome');
    var chromeOptions = new chrome.Options();
    const defaultChromeFlags = [
        '--headless',
        '--disable-gpu',
        '--window-size=1280x1696', // Letter size
        '--no-sandbox',
        '--user-data-dir=/tmp/user-data',
        '--hide-scrollbars',
        '--enable-logging',
        '--log-level=0',
        '--v=99',
        '--single-process',
        '--data-path=/tmp/data-path',
        '--ignore-certificate-errors',
        '--homedir=/tmp',
        '--disk-cache-dir=/tmp/cache-dir'
    ];
    let chromePath = '/var/task/lib/chrome';
    chromeOptions.setChromeBinaryPath(chromePath);
    chromeOptions.addArguments(defaultChromeFlags);
    builder.setChromeOptions(chromeOptions);

    var driver = builder.build();
    await driver.get(url);
    if (waitForElement) {
        // setTimeout(() => console.log(`delaying ${delay} milliseconds`), delay);
        await driver.wait(until.elementLocated(by.className(waitForElement)), 30000,
            `Element ${waitForElement} never displayed, are you sure you want to wait for it? Html was: ${await driver.getPageSource()}`);
    }
    const source = await driver.getPageSource();
    driver.quit();
    return source;
}