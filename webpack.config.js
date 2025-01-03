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
            template: 'src/index.html', // Укажите путь к вашему HTML файлу
            filename: 'index.html',
            lang: "ru",
            title: 'Гарвекс умные технологии',
            description: '«Гарвекс «Умные Технологии». Следующий уровень управления топливом, транспортом и предприятием.',
            inject: 'body', // Это автоматически добавит скрипты в ваш HTML
            hash: true,
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html', // Укажите путь к вашему HTML файлу
            filename: 'en/index.html',
            lang: "en",
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
                {
                    from: path.resolve(__dirname, 'node_modules/fslightbox/index.js'),
                    to: ({ absoluteFilename }) => {
                        // Измените имя файла здесь, если нужно
                        const newFileName = 'fsbox.js'; // Пример нового имени файла
                        return path.resolve(__dirname, 'html/js/utils/', newFileName);
                      },
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
