require('dotenv').config();
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

if(!process.env.CLIENT_APPLICATION_CREDENTIALS) {
  throw "missing CLIENT_APPLICATION_CREDENTIALS env var";
}
if(!fs.existsSync(process.env.CLIENT_APPLICATION_CREDENTIALS)) {
  throw "CLIENT_APPLICATION_CREDENTIALS env var is not a valid path";
}

const firebaseCredentials = JSON.stringify(require(process.env.CLIENT_APPLICATION_CREDENTIALS));

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    publicPath: '/',
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new webpack.DefinePlugin({
      FIREBASE_CONFIG: firebaseCredentials
    })
  ]
};