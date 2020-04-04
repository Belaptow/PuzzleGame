const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mainPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    chunks: ["renderer"]
});

const splitViewPlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/splitViewComponent/splitViewPage.html",
    filename: "./splitViewPage.html",
    chunks: ["splitView"]
})

const splitViewPlaceHolderPlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/placeholder/placeholder.html",
    filename: "./placeholder.html",
    chunks: ["placeholder"]
})

const calcPlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/calcComponent/calculatorPage.html",
    filename: "./calculatorPage.html",
    chunks: ["calculator"]
})

const timerPlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/timerComponent/timerPage.html",
    filename: "./timerPage.html",
    chunks: ["timer"]
})

const config = {
    target: "electron-renderer",
    devtool: "source-map",
    entry: {
        renderer: "./src/app/renderer.jsx",
        splitView: "./src/app/components/splitViewComponent/splitView.jsx",
        placeholder: "./src/app/components/placeholder/placeholder.jsx",
        calculator: "./src/app/components/calcComponent/calculator.jsx",
        timer: "./src/app/components/timerComponent/timer.jsx"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        mainPlugin,
        splitViewPlugin,
        splitViewPlaceHolderPlugin,
        calcPlugin,
        timerPlugin
    ]
};

module.exports = (env, argv) => {
    return config;
};