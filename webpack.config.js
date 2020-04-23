const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'main.js'
  },
  watch: true,
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ],
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'app.bundle.css'
    }),
  ]
};