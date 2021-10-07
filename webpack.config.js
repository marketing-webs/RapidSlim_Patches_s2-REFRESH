const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
        discount: "./src/routes/discount.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|ico|mp4)$/,
                loader: "file-loader",
                options: {
                    outputPath: "images",
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            chunks: ["index"],
            title: "RapidSlim Patches",
            template: "./src/index.html",
            filename: "index.html",
            favicon: "./src/images/favicon.ico",
        }),
        new HtmlWebPackPlugin({
            chunks: ["discount"],
            title: "Formularz zamowienia",
            template: "./src/routes/discount.html",
            filename: "discount.html",
            favicon: "./src/images/favicon.ico",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
};
