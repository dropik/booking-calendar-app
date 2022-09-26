const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.tsx",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean)
              }),
              transpileOnly: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
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
              bookingId: "1",
              name: "Vasya Pupkin",
              from: "2022-02-02",
              nights: 3,
              roomType: "camera matrimoniale/doppia",
              entity: "camera matrimoniale",
              persons: 2,
              color: "booking1",
              roomNumber: 3
            },
            {
              id: "2",
              bookingId: "1",
              name: "Ivan Petrov",
              from: "2022-02-02",
              nights: 3,
              roomType: "camera matrimoniale/doppia",
              entity: "camera matrimoniale",
              persons: 2,
              color: "booking1",
              roomNumber: 5
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
            to: "2022-02-05",
            occupations: 1,
            color: "booking1"
          },
          {
            id: "1",
            name: "Vasya Pupkin",
            from: "2022-03-01",
            to: "2022-03-04",
            occupations: 2,
            color: "booking2"
          },
          {
            id: "2",
            name: "Petr Sidorov",
            from: "2022-03-16",
            to: "2022-03-17",
            occupations: 1,
            color: "booking3"
          },
          {
            id: "3",
            name: "Petr Ivanov",
            from: "2022-04-01",
            to: "2022-04-03",
            occupations: 1,
            color: "booking4"
          },
          {
            id: "4",
            name: "Kirill Kirilov",
            from: "2022-04-02",
            to: "2022-04-03",
            occupations: 1,
            color: "booking5"
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

      devServer.app.get("/api/get/clients", (request, response) => {
        response.json([
          {
            id: "0",
            bookingId: "0",
            bookingName: "Ivan Petrov",
            name: "Ivan",
            surname: "Petrov",
            dateOfBirth: "1986-05-04",
            placeOfBirth: "Canazei (TN)",
            stateOfBirth: "Italia"
          },
          {
            id: "1",
            bookingId: "1",
            bookingName: "Vasya Pupkin",
            name: "Vasya",
            surname: "Pupkin",
            dateOfBirth: "1985-05-06",
            placeOfBirth: "Canazei (TN)",
            stateOfBirth: "Italia"
          }
        ]);
      });

      devServer.app.get("/api/find/clients", (request, response) => {
        response.json([
          {
            id: "0",
            name: "Ivan",
            surname: "Petrov",
            dateOfBirth: "1986-05-04",
            placeOfBirth: "Canazei (TN)",
            stateOfBirth: "Italia",
            documentNumber: "",
            documentType: "identityCard",
            booking: {
              id: "0",
              name: "Ivan Petrov",
              from: "2022-02-05",
              to: "2022-02-07",
              occupations: 1,
              color: "booking1"
            }
          },
          {
            id: "1",
            name: "Vasya",
            surname: "Pupkin",
            dateOfBirth: "1985-05-06",
            placeOfBirth: "Canazei (TN)",
            stateOfBirth: "Italia",
            documentNumber: "",
            documentType: "identityCard",
            booking: {
              id: "1",
              name: "Vasya Pupkin",
              from: "2022-02-25",
              to: "2022-02-26",
              occupations: 1,
              color: "booking2"
            }
          },
          {
            id: "2",
            name: "Ilja",
            surname: "Maksimov",
            dateOfBirth: "1985-05-06",
            stateOfBirth: "Russia",
            documentNumber: "",
            documentType: "identityCard",
            booking: {
              id: "2",
              name: "Vasya Pupkin",
              from: "2022-02-25",
              to: "2022-02-26",
              occupations: 1,
              color: "booking2"
            }
          },
          {
            id: "3",
            name: "Stepan",
            surname: "Ogurzov",
            dateOfBirth: "1985-05-06",
            stateOfBirth: "Russia",
            documentNumber: "",
            documentType: "identityCard",
            booking: {
              id: "2",
              name: "Vasya Pupkin",
              from: "2022-02-25",
              to: "2022-02-26",
              occupations: 1,
              color: "booking2"
            }
          }
        ]);
      });

      devServer.app.get("/api/get/hotel", (_, response) => {
        response.json({
          floors: [
            {
              name: "piano 1",
              rooms: [
                {
                  number: 1,
                  type: "camera tripla standard",
                },
                {
                  number: 2,
                  type: "appartamento",
                },
                {
                  number: 3,
                  type: "camera matrimoniale/doppia",
                },
                {
                  number: 4,
                  type: "camera tripla",
                },
                {
                  number: 5,
                  type: "camera matrimoniale/doppia",
                },
              ],
            },
            {
              name: "piano 2",
              rooms: [
                {
                  number: 6,
                  type: "camera matrimoniale/doppia",
                },
                {
                  number: 7,
                  type: "camera matrimoniale/doppia",
                },
                {
                  number: 8,
                  type: "camera singola",
                },
                {
                  number: 9,
                  type: "camera matrimoniale/doppia",
                },
                {
                  number: 10,
                  type: "camera matrimoniale/doppia economy",
                },
                {
                  number: 11,
                  type: "camera tripla",
                },
                {
                  number: 12,
                  type: "camera matrimoniale/doppia",
                },
              ],
            },
          ]
        });
      });

      devServer.app.get("/api/get/room-types", (_, response) => {
        response.json({
          "camera singola": [1],
          "camera matrimoniale/doppia":  [1, 2],
          "camera matrimoniale/doppia economy":  [1, 2],
          "camera tripla":  [2, 3],
          "camera tripla standard":  [2, 3],
          "appartamento":  [3, 4],
        });
      });

      return middlewares;
    }
  },
};
