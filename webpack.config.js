const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'themes/simple/javascript/react/index.jsx')
  ],
  output: {
    filename: 'javascript/bundle.js',
    path: path.resolve(__dirname, 'themes/simple')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|webp|gif|svg|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash]',
              useRelativePath: true,
              emitFile: false
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|atf)$/i,
        type: 'asset/resource',
      },
    ]
  }
}