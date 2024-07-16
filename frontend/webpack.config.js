const path = require('path');

module.exports = {
  entry: './src/index.js', // 1
  output: { // 2
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/, // 2
          use: ['style-loader', 'css-loader'], // 3
        },
      ],
    },
  };