const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "public/dist/"),
      publicPath: "/dist/",
      filename: "bundle.js",
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        "process.env.VERSION": JSON.stringify(process.env.npm_package_version),
      }),
    ],
  };
};
