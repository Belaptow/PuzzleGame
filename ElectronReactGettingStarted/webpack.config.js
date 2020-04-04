const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    target: "electron-main",
    devtool: "source-map",
    entry: "./src/main.js",
    output: {
        filename: "main.js",
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
            }
            //{
            //    test: /\.css$/,
            //    use: [MiniCssExtractPlugin.loader, 'css-loader']
            //}
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    //plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })]
};

module.exports = (env, argv) => {
    return config;
};