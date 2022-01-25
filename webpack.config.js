import path from 'path';
import process from 'process';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
const config  = {
    devServer: {
        static: {
          directory: path.join(process.cwd(), './build'),
        },
        compress: true,
        port: 9000,
    },
    entry: './src/index.ts',
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(process.cwd(), './build'),
        filename: '[name].bundle.js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/content/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: true
                }
            },
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', 'babel-preset-minify'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource'
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        chunkIds: 'named',
        mangleExports: true,
        minimize: true,
        providedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
          ],   
        splitChunks: {
          cacheGroups: {
            styles: {
              name: "styles",
              type: "css/mini-extract",
              chunks: "all",
              enforce: true,
            },
          },
        },
      }
};

export default config;