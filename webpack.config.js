const path = require('path');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main:'./src/main.js',
    },
    output: {
        filename: '[name].bundles.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].bundle.js',
    },
    plugins:[
        new CleanWebpackPlugin(),
    ]
};