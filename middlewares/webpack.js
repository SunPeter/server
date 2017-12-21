const config = require('config')
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

module.exports = config.env === 'production' ? async (ctx, next) => {
  console.log('skip webpack middle')
  await next()
} : webpackDevMiddleware(compiler, {
  dev: {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false
  },
  hot: {
    noInfo: false, 
    publicPath: webpackConfig.output.publicPath,
    log: console.log, 
    path: '/__webpack_hmr', 
    heartbeat: 10 * 1000
  }
})
