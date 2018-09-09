const path = require("path");

module.exports = {
    entry: {
        app: ["./src/index.js"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3100',
                pathRewrite: {"^/api" : ""},
                secure: false,
                changeOrigin: true
            },
            publicPath: "/assets/",
            historyApiFallback: true
        }
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "bundle.js"
    }
};
