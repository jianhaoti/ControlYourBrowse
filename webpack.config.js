const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.js",
    softblock: "./src/softblock.js",
    options: "./src/options.js",
    calendar: "./src/calendar.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // This should create 'softblock.js' correctly
  },
  plugins: [
    // calendar
    new HtmlWebpackPlugin({
      template: "./src/calendar.html",
      filename: "calendar.html",
      chunks: ["calendar"],
    }),

    // options
    new HtmlWebpackPlugin({
      template: "./src/options.html",
      filename: "options.html",
      chunks: ["options"],
    }),

    new CopyPlugin({
      patterns: [{ from: "src/manifest.json", to: "manifest.json" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
