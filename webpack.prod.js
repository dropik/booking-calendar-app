const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (env) => merge(common(env), {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              transpileOnly: false
            }
          }
        ]
      }
    ]
  }
});
