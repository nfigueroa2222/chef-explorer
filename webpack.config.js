const path = require('path');
module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/scripts'),
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './public'), // Serve static files from 'public' directory
    compress: true,
    port: 9000, // You can choose your preferred port
  }
};