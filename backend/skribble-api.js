/**
 * Entry Script
 */
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    // In production, serve the webpacked src file.
    require('./dist');
} else {
    // Babel polyfill to convert ES6 code in runtime
    require('@babel/register');
    require('./src');
}
