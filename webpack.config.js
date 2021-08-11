const path = require("path");

function toKebab(input) {
    return input.slice(0, 1).toLowerCase() +
           input.slice(1).replace(/[A-Z]/g, l => "-" + l.toLowerCase());
}

module.exports = env => ({
    mode: "production",
    entry: path.resolve(__dirname, "src", env.addon ?? env.lib),
    output: {
        library: {
            type: "commonjs2"
        },
        filename: "main.js",
        path: env.release
            ? env.addon
                ? path.resolve(__dirname, "release", env.addon ?? env.lib)
                : path.resolve("D:\\MEGA\\Shared\\Node Projects\\ReGuilded\\ReGuilded\\libs", toKebab(env.lib))
            : env.addon
                ? path.resolve(process.env.APPDATA, ".reguilded", "settings", "addons", env.addon)
                : path.resolve(process.env.APPDATA, ".reguilded", "ReGuilded", "libs", toKebab(env.lib))
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
        }, {
            test: /\.html/i,
            use: ["raw-loader"]
        }]
    },
    externals: [{
        "@reguilded/api": "global window",
        "@reguilded/api/lib": ["global ReGuilded", "addonLib"],
        "@reguilded/api/patcher": ["global ReGuilded", "addonLib", "patcher"],
        "@reguilded/api/modalStack": ["global ReGuilded", "addonLib", "ModalStack"],
        "@reguilded/api/settingsFields": ["global ReGuilded", "addonLib", "SettingsFields"]
    }, Object.fromEntries(require("module").builtinModules.map(e => [e,e]))]
});