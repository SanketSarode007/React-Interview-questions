const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',  
  output: {
    filename: 'bundle.js',   
    path: path.resolve(__dirname, 'dist'),  
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, 
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('@tailwindcss/postcss'),
            require('autoprefixer')
          ]
        }
      }
    }],
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', 
      filename: 'index.html',    
    }),
    new Dotenv()
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),  
    compress: true,  
    port: 3000,       
    hot: true,     
    historyApiFallback: true,  
  },
};
