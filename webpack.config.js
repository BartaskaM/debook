let HtmlWebpackPlugin = require('html-webpack-plugin');

let projectDir = __dirname + '/';
let appDir = __dirname + '/app/';
let buildDir = __dirname + '/app/dist/';

module.exports = {
  entry: appDir + 'index.jsx',
  output: {
    filename: 'bundle.js',
    path: buildDir
  },
  plugins: [new HtmlWebpackPlugin({
    template: appDir + 'index.html'
  })],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
          }
        }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
