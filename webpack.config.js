const path = require('path');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main:'./src/main.js',
        init:'./src/init.js'
    },
    output: {
        filename: '[name].bundles.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].bundle.js',
    },
    module:{
        rules:[
            {
                test: /\.m?js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                    },
                },
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
    ]
};