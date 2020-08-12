const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  // 진입점 : 이 프로젝트에서 가장 먼저 실행되는 파일
  entry: {
    app: path.join(__dirname, "main.js"), // 별칭 app
  },
  // 결과물에 대한 설정
  output: {
    filename: "[name].js", // entry의 별칭이 설정됨
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
