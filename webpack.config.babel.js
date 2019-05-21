import path from 'path'

import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { WDS_PORT } from './src/shared/config'
import { isProd } from './src/shared/util'

export default {
  mode: isProd ? 'production' : 'development',
  entry: [
    'react-hot-loader/patch',
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
            sourceMap: true,
            importLoaders: 1,
          }
        },
        'postcss-loader'
      ]},
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: (isProd ? [
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
        allChunks: true
      })
    ] : []).concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ])
}
