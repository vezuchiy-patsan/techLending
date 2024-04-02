const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'html/js/'),
    output: {
        path: path.resolve(__dirname, 'html'),
        filename: '[name].js',
        publicPath: '../'
    },
    watch: true,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '*.js', // Удаляет все JS файлы в папке html
                '!js/**/*.js', // Исключает JS файлы в папке html/js
            ],
        }),

        new HtmlWebpackPlugin({
            template: 'html/index.html', // Укажите путь к вашему HTML файлу
            filename: 'ru/index.html',
            title: 'Гарвекс умные технологии',
            description: '«Гарвекс «Умные Технологии». Следующий уровень управления топливом, транспортом и предприятием.',
            inject: 'body', // Это автоматически добавит скрипты в ваш HTML
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: 'html/index.html', // Укажите путь к вашему HTML файлу
            filename: 'en/index.html',
            title: 'Garvex Smart Technologies',
            description: 'Garvex Smart Technologies. The next level of fuel, transport and enterprise management.',
            inject: 'body', // Это автоматически добавит скрипты в ваш HTML
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: "css/css/[name].css",
            chunkFilename: "css/css/[id].css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'node_modules/intl-tel-input/build/js/utils.js'),
                    to: path.resolve(__dirname, 'html/js/utils/mask/'),
                },
            ],
        }),
    ],
    module: {
        rules: [
            // другие правила...
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: './images/[name][ext]',
                },
            },
        ]
    },
};
