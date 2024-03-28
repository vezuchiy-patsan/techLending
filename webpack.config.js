const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'html/js/'),
    output: {
        path: path.resolve(__dirname, 'html'),
        filename: '[name].[contenthash].js',
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
            inject: 'body', // Это автоматически добавит скрипты в ваш HTML
        }),
        new HtmlWebpackPlugin({
            template: 'html/index.html', // Укажите путь к вашему HTML файлу
            filename: 'en/index.html',
            inject: 'body', // Это автоматически добавит скрипты в ваш HTML
        }),



    ],
};