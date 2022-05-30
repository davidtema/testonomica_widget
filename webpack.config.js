const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    // resolve: {
    //     // this is for background images in css.
    //     // e.g. background-image: url(images/bg.png);
    //     modules: [
    //         path.resolve(__dirname, "frontend/web"),
    //         path.resolve(__dirname, "node_modules"),
    //     ],
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/react']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
}