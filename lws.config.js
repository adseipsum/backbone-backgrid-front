module.exports = {
    port: 8080,
    stack: ['cors', './lib/csp.js', 'conditional-get', 'static'],
    verbose: true
}
