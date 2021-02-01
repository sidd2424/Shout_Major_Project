module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // presets: ['@babel/preset-env', '@babel/preset-react']
        },
      },
    ],
  },
};
