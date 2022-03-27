const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
      publicPath: "/",
    },
    port: 3000,
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      devServer.app.get("/api/export/police", (request, response) => {
        const date = new Date(request.query["date"]);
        if (date.getDate() % 2 === 0) {
          response.send("Exported!");
        } else {
          response.send("");
        }
      });

      devServer.app.get("/api/export/istat", (request, response) => {
        response.set("content-type", "application/pdf");
        response.set("content-disposition", `attachment; filename="istat-${request.query["date"]}.pdf"`);
        response.send("Exported!");
      });

      return middlewares;
    }
  },
};
