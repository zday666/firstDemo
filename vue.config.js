const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  devServer: {
    disableHostCheck: true,
    /*proxy: {
       "/api": {
        target: "http://43.135.144.98:5781", // 后台接口域名
        ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        logLevel: "debug", //控制台打印
        pathRewrite: {
          "^/api": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
      },
    }, */
    proxy: {
      "/api": {
        target: "http://101.34.88.184:5781", // 线上环境
        ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // false为http访问，true为https访问
        changeOrigin: true, // 跨域访问设置，true代表跨域
        logLevel: "debug", //控制台打印
        pathRewrite: {
          "^/api": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        },
      },
    },
  },
  assetsDir: "h5",
  lintOnSave: false,
  configureWebpack: (config) => {
    Object.assign(config.resolve.alias, {
      "@utils": resolve("src/utils"),
      "@libs": resolve("src/libs"),
      "@api": resolve("src/api"),
      "@components": resolve("src/components"),
      "@assets": resolve("src/assets"),
      "@css": resolve("src/assets/css"),
      "@images": resolve("src/assets/images"),
      "@views": resolve("src/views"),
      "@mixins": resolve("src/mixins"),
    });

    if (process.env.NODE_ENV !== "production") {
      config.plugins.push(
        new HardSourceWebpackPlugin(),
        new AutoDllPlugin({
          inject: true,
          debug: true,
          filename: "[name]_[hash].js",
          path: "./dll" + Date.parse(new Date()),
          entry: {
            vendor_vue: ["vue", "vuex", "vue-router"],
            vendor_ui: ["vue-awesome-swiper", "vue-ydui"],
            vendor_tools: ["axios", "core-js"],
          },
        })
      );
    }
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].VUE_APP_NAME = process.env.VUE_APP_NAME;
      return args;
    });
  },
};
