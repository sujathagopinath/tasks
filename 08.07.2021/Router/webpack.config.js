const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "./bundle.js",
    },
    mode: 'development',
    devServer: {
        port: 2000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],
};
