'use strict';

/**
 * Content Security Policy middleware
 *
 * Content Security Policy helps prevent unwanted content being injected into your webpages;
 * this can mitigate cross-site scripting (XSS) vulnerabilities, malicious frames, unwanted trackers, and more.
 * If you want to learn how CSP works, check out the fantastic HTML5 Rocks guide, the Content Security Policy Reference,
 * and the Content Security Policy specification. This module helps set Content Security Policies.
 *
 * base on https://github.com/lwsjs/cors/blob/master/index.js and https://github.com/koajs/cors/blob/master/index.js
 */
 
module.exports = MiddlewareBase => class Csp extends MiddlewareBase {
  description () {
    return 'Support for setting Content Security Policy headers.'
  }
  optionDefinitions () {
    return []
  }
  middleware (options) {
    options = options || {}
    
    const cspOptions = {}
    this.emit('verbose', 'middleware.csp.config', cspOptions)

    return function(opt) {
        opt.keepHeadersOnError = opt.keepHeadersOnError === undefined || !!opt.keepHeadersOnError;
        return function csp(ctx, next) {
            const headersSet = {};

            function set(key, value) {
                ctx.set(key, value);
                headersSet[key] = value;
            }

            if (ctx.method !== 'OPTIONS') {
                set('Content-Security-Policy', "default-src 'unsafe-inline' 'unsafe-eval' http:");

                if (!opt.keepHeadersOnError) {
                    return next();
                }
                return next().catch(err => {
                    err.headers = Object.assign({}, err.headers, headersSet);
                    throw err;
                });
            }
        };
    }(cspOptions);
  }
}
