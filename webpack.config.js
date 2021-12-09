const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

var config = {
    // TODO: Add common Configuration
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js/,
                enforce: 'pre',
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                    {
                        loader: 'source-map-loader'
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: '../css/img/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: '../css/font/'
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '../assets/js')
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                extractComments: 'all',
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            }),
            new CssMinimizerPlugin(),
        ]
    }
};

var themeConfig = Object.assign({}, config, {
    entry: {
        theme: [
            './js/theme.js',
            './scss/theme.scss'
        ],
    },
    output: {
        path: path.resolve(__dirname, '../assets/js'),
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "../css/[name].css",
            chunkFilename: "../css/[id].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            //'Popper': 'popper.js',
            Popper: ['popper.js', 'default'], // Used for Bootstrap dropdown, popup and tooltip JavaScript components
            'exports-loader?Popper!popper.js/dist/umd/popper': ['Popper', 'window.Popper'],
            'exports-loader?Util!bootstrap/js/dist/util': ['Util'],
            'exports-loader?Collapse!bootstrap/js/dist/collapse': ['Collapse'],
            'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy': ['Scrollspy'],
            'exports-loader?Dropdown!bootstrap/js/dist/dropdown': ['Dropdown'],
            'exports-loader?Modal!bootstrap/js/dist/modal': ['Modal']
        }),
        new WebpackNotifierPlugin({
            title: function (params) {
                return `Build status is ${params.status} with message ${params.message}`;
            },
            alwaysNotify: true,
            emoji: true
        })
    ]
});
module.exports = [
    themeConfig
];
