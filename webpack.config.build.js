const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(__dirname, './jsx');
const BUILD_PATH = path.resolve(__dirname, './static');

let d = fs.readdirSync(APP_PATH).filter(f => f !== '.DS_Store'), entry = {}
d.forEach(f => {
    let n = path.basename(f, '.js')
    entry[n] = path.join(APP_PATH, f)
})

module.exports = {
    entry: entry, 
    devtool: '#source-map',
    output: {
        filename: '[name].js',
        path: BUILD_PATH,
        publicPath: '/static'
    },
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