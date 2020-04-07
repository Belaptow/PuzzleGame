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

const datastructPlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/dataStructuresComponent/datastructPage.html",
    filename: "./datastructPage.html",
    chunks: ["datastruct"]
})

const gameOfLifePlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/gameOfLifeComponent/gameOfLifePage.html",
    filename: "./gameOfLifePage.html",
    chunks: ["gameOfLife"]
})

const snake2dPlugin = new HtmlWebPackPlugin({
    template: "./src/app/components/snake2dComponent/snake2dPage.html",
    filename: "./snake2dPage.html",
    chunks: ["snake2d"]
})

const config = {
    target: "electron-renderer",
    devtool: "source-map",
    entry: {
        renderer: "./src/app/renderer.jsx",
        splitView: "./src/app/components/splitViewComponent/splitView.jsx",
        placeholder: "./src/app/components/placeholder/placeholder.jsx",
        calculator: "./src/app/components/calcComponent/calculator.jsx",
        timer: "./src/app/components/timerComponent/timer.jsx",
        datastruct: "./src/app/components/dataStructuresComponent/datastruct.jsx",
        gameOfLife: "./src/app/components/gameOfLifeComponent/gameOfLife.jsx",
        snake2d: "./src/app/components/snake2dComponent/snake2d.jsx"
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
        timerPlugin,
        datastructPlugin,
        gameOfLifePlugin,
        snake2dPlugin
    ]
};

module.exports = (env, argv) => {
    return config;
};