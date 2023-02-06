import path from 'path';
import process from 'process';
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpack from 'webpack';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProd = process.env.PRODUCTION === "1"

/**
 * @type {webpack.Configuration}
 */
const config = {
    entry: './src/index.tsx',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    output: {
        path: path.resolve(process.cwd(), './build'),
        filename: "[name].[chunkhash].js",
        clean: true
    },
    plugins: [
        ...(isProd ? [new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
        })] : [new ReactRefreshWebpackPlugin()]),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new CopyPlugin({
            patterns: [
                { from: './static', to: './' },
            ]
        }),
        new HtmlWebpackPlugin({
            template: "src/content/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "src/content/index.html",
            filename: "404.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: 'ts-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: isProd
                }
            },
            {
                test: /\.(js|jsx)$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [!isProd && 'react-refresh/babel'],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource'
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json', '.css'],
    },
    optimization: isProd ? {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                    /**
                     * @param {{context: string, type: string}} module 
                     */
                    name(module) {
                        if (module.type.includes('css/')) {
                            return 'css'
                        }
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
        minimizer: [
            `...`,
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    } : {}
};

export default config;