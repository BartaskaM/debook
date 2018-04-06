const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const appDir = path.resolve(__dirname, 'app/');
const buildDir = path.resolve(__dirname, 'wwwroot/dist/');

module.exports = {
  entry: {
    main: path.resolve(appDir, 'index.jsx'),
  },
  output: {
    filename: 'index_bundle.js',
    path: buildDir,
    publicPath: '/dist/',
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public/index.html'),
  })],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, 'app'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          query: {
            configFile: './.eslintrc',
          },
        }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env'],
          plugins: [
            'react-hot-loader/babel',
            'babel-plugin-transform-class-properties',
            'babel-plugin-transform-object-rest-spread',
            'transform-object-rest-spread',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
