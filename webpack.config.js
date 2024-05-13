const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.js",
    softblock: "./src/softblock.js",
    options: "./src/options.js",
    schedule: "./src/schedule.js",
    app: "./src/App.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/app.html",
      filename: "App.html",
      chunks: ["App"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/options.html",
      filename: "options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/softblock.html",
      filename: "softblock.html",
      chunks: ["softblock"],
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/assets", to: "assets" }, // Copy assets folder
      ],
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
        exclude: /\.module\.css$/, // Exclude CSS Modules
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.module\.css$/, // Handle CSS Modules
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]", // Customize the generated class name
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Serve content from 'dist' directory
    },
    historyApiFallback: {
      index: "app.html",
    }, // This ensures all routes fallback to index.html (can be set to serve app.html specifically)
    open: true, // Automatically opens the browser
    compress: true, // Enable gzip compression
    hot: true, // Enable Webpack's Hot Module Replacement feature
    port: 8080, // Set the port to run the dev server
  },
};
