var path = require("path");

module.exports = {
  entry: {
    app: "./app/index"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: "./dist"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.mustache$/,
        loader: "mustache-loader"
      },
      {
        test: /\.scss$/,
        use: ["css-loader", "sass-loader"]
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
