const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'html'),
    },
    watch: true,
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'html/index.html', to: 'en/index.html'},
                { from: 'html/index.html', to: 'ru/index.html' },
            ],
        }),
    ],
};
