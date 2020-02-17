export default {
    quiet: true,
    port: 47569,
    logLevel: 'silent',
    chromeFlags: [
        '--headless',
        '--no-sandbox'
    ],
    audits: [
        'estimated-input-latency',
        'first-contentful-paint-3g',
        'first-contentful-paint',
        'first-cpu-idle',
        'first-meaningful-paint',
        'interactive',
        'max-potential-fid',
        'speed-index',
        'total-blocking-time'
    ],
    onlyCategories: ['performance'],
    settings:{
        output:'json',
        onlyCategories:['performance'],
        emulatedFormFactor:'none',
        throttling: {
            cpuSlowdownMultiplier:1
        }
    },
    extends: 'lighthouse:default'
};
