const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: "./src/client/js/home.js",
    mode: "development",
    target: "web",
    devtool: "eval",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            },

            {
                test: /\.css$/,
                use: ["vue-style-loader", "style-loader", "css-loader", "postcss-loader"]
            },

            {
                test: /\.less$/,
                use: ["vue-style-loader", "style-loader", "css-loader", "postcss-loader", "less-loader"]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ["file-loader"]
            },
        ]
    },

    resolve: {
        alias: {
            vue: "@vue/runtime-dom"
        },
    },

    plugins: [
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/client/html/home.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: "node_modules/@fortawesome/fontawesome-free/", to: "libs/fontawesome" },
                { from: "src/client/assets/", to: "assets" },
            ]
        })
    ]
}