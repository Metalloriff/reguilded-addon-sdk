const path = require("path");

module.exports = env => ({
    mode: "production",
    entry: path.resolve(__dirname, "src", env.addon),
    output: {
        library: {
            type: "commonjs2"
        },
        filename: "main.js",
        path: env.release
            ? path.resolve(__dirname, "release", env.addon)
            : path.resolve(process.env.APPDATA, ".reguilded", "settings", "addons", env.addon)
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: ["css-loader"]
        }, {
            test: /\.s[ac]ss$/i,
            use: ["css-loader", "sass-loader"]
        }, {
            test: /\.m?(j|t)sx?$/i,
            exclude: /node_modules/,
            use: {
                loader: "@sucrase/webpack-loader",
                options: {
                    transforms: ["jsx", "typescript"]
                }
            }
        }]
    },
    externals: [{
        "@reguilded/api": "global ReGuilded"
    }]
});