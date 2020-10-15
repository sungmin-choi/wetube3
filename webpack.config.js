const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js")
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: {
        app: ['babel-polyfill', './assets/js/main.js'],
    },
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        options: {
          presets: [
            // 배열로 선언하면 babel이 컴파일 할 대상 브라우저도 지정 가능
            ['@babel/preset-env', {
              targets: {
                // 크롬 최종 버젼으로 부터 2개 버젼 https://github.com/browserslist/browserslist#queries
                browsers: ['last 2 chrome versions'],
              },
              debug: true,
            }],
            '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      browsers: "cover 99.5%",
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
  ],
};

module.exports = config;
