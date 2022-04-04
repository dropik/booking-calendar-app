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

      devServer.app.get("/api/calc/tax", (request, response) => {
        response.json({
          standard: 100,
          children: 12,
          over10Days: 2
        });
      });

      devServer.app.get("/api/get/booking", (request, response) => {
        response.json({
          id: "1",
          name: "Vasya Pupkin",
          from: "2022-02-02",
          to: "2022-02-05",
          rooms: [
            {
              id: "1",
              type: "camera matrimoniale/doppia",
              entity: "camera matrimoniale",
              from: "2022-02-02",
              to: "2022-02-05",
              guests: [
                {
                  id: "0",
                  name: "Vasya",
                  surname: "Pupkin",
                  dateOfBirth: "1985-05-06"
                },
                {
                  id: "1",
                  name: "Masha",
                  surname: "Pupkina",
                  dateOfBirth: "1987-07-20"
                }
              ]
            },
            {
              id: "2",
              type: "camera matrimoniale/doppia",
              entity: "camera matrimoniale",
              from: "2022-02-02",
              to: "2022-02-05",
              roomNumber: 5,
              guests: [
                {
                  id: "2",
                  name: "Ivan",
                  surname: "Petrov",
                  dateOfBirth: "1990-08-20"
                },
                {
                  id: "3",
                  name: "Natasha",
                  surname: "Petrova",
                  dateOfBirth: "1991-05-09"
                }
              ]
            }
          ]
        });
      });

      devServer.app.get("/api/find/bookings", (request, response) => {
        response.json([
          {
            id: "0",
            name: "Ivan Petrov",
            from: "2022-02-02",
            to: "2022-02-05"
          },
          {
            id: "1",
            name: "Vasya Pupkin",
            from: "2022-03-01",
            to: "2022-03-04"
          },
          {
            id: "2",
            name: "Petr Sidorov",
            from: "2022-03-16",
            to: "2022-03-17"
          },
          {
            id: "3",
            name: "Petr Ivanov",
            from: "2022-04-01",
            to: "2022-04-03"
          },
          {
            id: "4",
            name: "Kirill Kirilov",
            from: "2022-04-02",
            to: "2022-04-03"
          }
        ]);
      });

      devServer.app.get("/api/get/client", (request, response) => {
        response.json({
          id: "0",
          name: "Ivan",
          surname: "Petrov",
          dateOfBirth: "1986-05-04",
          placeOfBirth: "Canazei",
          stateOfBirth: "Italia",
          documentNumber: "000000",
          documentType: "identityCard",
          booking: {
            id: "0",
            name: "Ivan Petrov",
            from: "2022-02-02",
            to: "2022-02-05"
          }
        });
      });

      return middlewares;
    }
  },
};
