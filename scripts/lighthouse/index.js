import lighthouse from 'lighthouse';
const chromeLauncher = require('chrome-launcher');
import log from 'lighthouse-logger';
import defaultOptions from "./defaultOptions";

const lighthouseAsync = async (url, options) => await lighthouse(url, options, {settings: options.settings, extends: options.extends});
const launchChromeAsync = async ({chromeFlags}) => await chromeLauncher.launch({chromeFlags});

export default async (options) => {
	const _options = {
		...defaultOptions,
		...options
	};
	const _chrome = await launchChromeAsync(_options);
	const getOptions = (options) => {
		const newOptions = {
			..._options,
			...options
		};
		newOptions.port = _chrome.port;
		newOptions.settings.output = 'json';
		return newOptions;
	};
	log.setLevel(_options.logLevel);
	return {
		testAsync: async (testUrl, testOptions) => await lighthouseAsync(testUrl, getOptions(testOptions)),
		killAsync: async () => await _chrome.kill()
	}
}


