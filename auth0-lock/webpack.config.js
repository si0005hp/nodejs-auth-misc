const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html'
});

// Load .env values
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.DefinePlugin(envKeys),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/client'), 'node_modules'],
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    open: true,
    host: 'localhost',
    port: 8088,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3033',
        secure: false,
        logLevel: 'debug'
      }
    },
  }
};