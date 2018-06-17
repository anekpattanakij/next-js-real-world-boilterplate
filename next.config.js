const withTypescript = require('@zeit/next-typescript');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withTypescript], {
  distDir: '../.next',
});
