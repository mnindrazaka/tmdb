const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    preferRelative: true,
    alias: {
      "@/*": path.resolve(__dirname, "src/**"),
    },
    plugins: [new TsconfigPathsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
