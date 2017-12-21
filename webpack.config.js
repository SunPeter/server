const path = require('path');
const fs = require('fs')
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(__dirname, './jsx/page');
const BUILD_PATH = path.resolve(__dirname, './static');

let d = fs.readdirSync(APP_PATH).filter(f => f !== '.DS_Store'), entry = {}
let client = 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true&timeout=20000'
d.forEach(f => {
    let n = path.basename(f, '.js')
    entry[n] = [path.join(APP_PATH, f)].concat(client)
})

module.exports = {
    entry: entry, 
    devtool: '#source-map',
    output: {
        filename: '[name].js',
        path: BUILD_PATH,
        publicPath: '/static'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.(jsx|js)?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=50000',
            exclude: /node_modules/
        }]
    }
};