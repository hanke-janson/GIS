/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
let CopyWebpackPlugin = require("copy-webpack-plugin");
let webpack = require("webpack");
module.exports = {
  devServer: {
    // open: true,
    proxy: "http://192.168.12.1:19002",
    // proxy: {
    //   "/localhost": {
    //     target: "http://192.168.12.1:19002/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/localhost": "",
    //     },
    //   },
    // },
  },
  configureWebpack: {
    plugins: [
      // copy-webpack-plugin 6.x 的写法
      // new CopyWebpackPlugin({
      //   patterns: [
      //     { from: "node_modules/cesium/Build/Cesium/Workers", to: "cesium/Workers" },
      //     {
      //       from: "node_modules/cesium/Build/Cesium/ThirdParty",
      //       to: "cesium/ThirdParty"
      //     },
      //     { from: "node_modules/cesium/Build/Cesium/Assets", to: "cesium/Assets" },
      //     { from: "node_modules/cesium/Build/Cesium/Widgets", to: "cesium/Widgets" }
      //   ]
      // }),
      // copy-webpack-plugin 5.x 的写法
      new CopyWebpackPlugin([
        {
          from: "node_modules/cesium/Build/Cesium/Workers",
          to: "cesium/Workers",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: "node_modules/cesium/Build/Cesium/Assets",
          to: "cesium/Assets",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: "node_modules/cesium/Build/Cesium/Widgets",
          to: "cesium/Widgets",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: "node_modules/cesium/Build/Cesium/ThirdParty",
          to: "cesium/ThirdParty",
        },
      ]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("./cesium"),
      }),
    ],
    module: {
      unknownContextCritical: false,
      unknownContextRegExp:
        /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
    },
  },
  chainWebpack: (config) => {
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  },
};
