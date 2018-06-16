'use strict';

exports.getSource = (url) => {
    return new Promise((resolve, reject) => {
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
        driver.get(url);
        driver.getPageSource()
            .then(source => resolve(source))
            .catch(error => reject(error));

        driver.quit();
    });
}