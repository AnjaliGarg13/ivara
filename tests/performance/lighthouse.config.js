/** @type {import('@lhci/cli').LighthouseRcConfig} */
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        extraHeaders: JSON.stringify({
          'Accept-Language': 'en-IN,en;q=0.9,hi;q=0.8',
        }),
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: require('./budget.json').ci.assert,
  },
}
