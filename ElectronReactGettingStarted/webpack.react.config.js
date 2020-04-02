const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");


const mainPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html",
    chunks: ["renderer"]
});

const config = {
    target: "electron-renderer",
    devtool: "source-map",
    entry: {
        renderer: "./src/app/renderer.jsx",
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
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [mainPlugin]
};

module.exports = (env, argv) => {
    return config;
};