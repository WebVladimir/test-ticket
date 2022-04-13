const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const fs = require('fs');

const projectName = '';

module.exports = (env) => {
    const isProduction = env && env.production === true;
    const withSourceMaps = !isProduction;
    const buildVersion = Math.floor(Date.now() / 1000);
    let htmlPlugin;

    if (projectName && isProduction) {
        htmlPlugin = new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: path.resolve('../../views', projectName, 'index.html'),
            inject: false,
            templateParameters: () => {
                return {
                    buildVersion,
                    isProduction: true,
                    bunkerJson: '{{{bunkerJson}}}',
                    assetsPath: `{{staticPath}}/${projectName}/dist`,
                    serverTime: '{{serverTime}}',
                };
            },
        });
    } else {
        htmlPlugin = new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: !isProduction,
            templateParameters: () => {
                const bunkerPath = path.resolve(__dirname, '__mocks__/bunker.json');
                let bunkerJson = '{}';

                if (fs.existsSync(bunkerPath)) {
                    bunkerJson = fs.readFileSync(bunkerPath, 'utf-8').trim();
                }

                return {
                    buildVersion,
                    bunkerJson,
                    isProduction,
                    assetsPath: '',
                    serverTime: Math.floor(Date.now() / 1000),
                };
            },
        });
    }

    return {
        entry: {
            app: './src/main.js',
        },
        output: {
            filename: 'js/[name].js?v=[hash:8]',
            path: path.resolve(__dirname, 'dist'),
            publicPath: isProduction ? '../' : '/',
        },
        devtool: withSourceMaps ? 'source-map' : false,
        mode: isProduction ? 'production' : 'development',
        optimization: {
            minimizer: [
                new TerserJSPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorPluginOptions: {
                        preset: [
                            'default',
                            {
                                svgo: false,
                            },
                        ],
                    },
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /\/node_modules\//,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
        },
        devServer: {
            open: true,
            hot: true,
            clientLogLevel: 'warn',
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve('src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                            ],
                        },
                    },
                },
                {
                    test: /\.less$/,
                    use: [
                        ...isProduction
                            ? [MiniCssExtractPlugin.loader]
                            : ['vue-style-loader'],
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: withSourceMaps,
                            },
                        },
                        ...isProduction
                             ? [{
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer(),
                                    ],
                                    sourceMap: withSourceMaps,
                                },
                            }]
                            : [],
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: withSourceMaps,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: isProduction ? 15000 : -1,
                        name: 'images/[name].[ext]?v=[hash:8]',
                    },
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: isProduction ? 15000 : -1,
                                name: 'images/[name].[ext]?v=[hash:8]',
                            },
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { removeUnknownsAndDefaults: false },
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: isProduction ? 10000 : -1,
                        name: 'fonts/[name].[ext]?v=[hash:8]',
                    },
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            htmlPlugin,
            new CopyWebpackPlugin([
                {
                    from: 'static',
                    to: 'static',
                },
            ]),
            ...isProduction
                ? [
                    new MiniCssExtractPlugin({
                        filename: 'css/[name].css?v=[hash:8]',
                    }),
                    new CleanWebpackPlugin(),
                ]
                : [
                    new ExtraWatchWebpackPlugin({
                        dirs: ['__mocks__'],
                    }),
                ],
        ],
    };
};
