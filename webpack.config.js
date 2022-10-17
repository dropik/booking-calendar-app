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

      devServer.app.get("/api/v1/stats/police", (request, response) => {
        setTimeout(() => {
          const date = new Date(request.query["date"]);
          if (date.getDate() % 2 === 0) {
            response.send("Exported!");
          } else {
            response.send("");
          }
        }, 500);
      });

      devServer.app.get("/api/v1/stats/istat", (request, response) => {
        setTimeout(() => {
          response.set("content-type", "application/pdf");
          response.set("content-disposition", `attachment; filename="istat-${request.query["date"]}.pdf"`);
          response.send("Exported!");
        }, 500);
      });

      devServer.app.get("/api/v1/stats/city-tax", (_, response) => {
        setTimeout(() => {
          response.json({
            standard: 100,
            children: 12,
            over10Days: 2
          });
        }, 500);
      });

      devServer.app.get("/api/v1/booking", (_, response) => {
        setTimeout(() => {
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
                roomId: 2
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
                roomId: 4
              }
            ]
          });
        }, 500);
      });

      devServer.app.get("/api/v1/booking-short", (_, response) => {
        setTimeout(() => {
          response.json({
            id: "1",
            name: "Vasya Pupkin",
            from: "2022-02-02",
            to: "2022-02-05",
            occupations: 2,
            color: "booking1"
          });
        }, 500);
      });

      devServer.app.get("/api/v1/bookings", (_, response) => {
        setTimeout(() => {
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
        }, 500);
      });

      devServer.app.get("/api/v1/clients", (request, response) => {
        setTimeout(() => {
          if (request.query["tileId"]) {
            response.json([
              {
                id: "0",
                bookingId: "0",
                name: "Ivan",
                surname: "Petrov",
                dateOfBirth: "1986-05-04",
                placeOfBirth: "Canazei (TN)",
                stateOfBirth: "Italia"
              },
              {
                id: "1",
                bookingId: "1",
                name: "Vasya",
                surname: "Pupkin",
                dateOfBirth: "1985-05-06",
                placeOfBirth: "Canazei (TN)",
                stateOfBirth: "Italia"
              }
            ]);
          } else {
            response.json([
              {
                id: "0",
                bookingId: "0",
                name: "Ivan",
                surname: "Petrov",
                dateOfBirth: "1986-05-04",
                placeOfBirth: "Canazei (TN)",
                stateOfBirth: "Italia"
              },
              {
                id: "1",
                name: "Vasya",
                bookingId: "1",
                surname: "Pupkin",
                dateOfBirth: "1985-05-06",
                placeOfBirth: "Canazei (TN)",
                stateOfBirth: "Italia"
              },
              {
                id: "2",
                bookingId: "2",
                name: "Ilja",
                surname: "Maksimov",
                dateOfBirth: "1985-05-06",
                stateOfBirth: "Russia"
              },
              {
                id: "3",
                bookingId: "2",
                name: "Stepan",
                surname: "Ogurzov",
                dateOfBirth: "1985-05-06",
                stateOfBirth: "Russia"
              }
            ]);
          }
        }, 500);
      });

      devServer.app.get("/api/v1/floors", (_, response) => {
        setTimeout(() => {
          response.json([
            {
              id: 0,
              name: "Piano 1",
              rooms: [
                {
                  id: 0,
                  floorId: 0,
                  number: "1",
                  type: "camera tripla standard",
                },
                {
                  id: 1,
                  floorId: 0,
                  number: "2",
                  type: "appartamento",
                },
                {
                  id: 2,
                  floorId: 0,
                  number: "3",
                  type: "camera matrimoniale/doppia",
                },
                {
                  id: 3,
                  floorId: 0,
                  number: "4",
                  type: "camera tripla",
                },
                {
                  id: 4,
                  floorId: 0,
                  number: "5",
                  type: "camera matrimoniale/doppia",
                }
              ]
            },
            {
              id: "1",
              name: "Piano 2",
              rooms: [
                {
                  id: 5,
                  floorId: 1,
                  number: "6",
                  type: "camera matrimoniale/doppia",
                },
                {
                  id: 6,
                  floorId: 1,
                  number: "7",
                  type: "camera matrimoniale/doppia",
                },
                {
                  id: 7,
                  floorId: 1,
                  number: "8",
                  type: "camera singola",
                },
                {
                  id: 8,
                  floorId: 1,
                  number: "9",
                  type: "camera matrimoniale/doppia",
                },
                {
                  id: 9,
                  floorId: 1,
                  number: "10",
                  type: "camera matrimoniale/doppia economy",
                },
                {
                  id: 10,
                  floorId: 1,
                  number: "11",
                  type: "camera tripla",
                },
                {
                  id: 11,
                  floorId: 1,
                  number: "12",
                  type: "camera matrimoniale/doppia",
                }
              ]
            },
          ]);
        }, 500);
      });

      devServer.app.post("/api/v1/floors", (_, response) => {
        setTimeout(() => {
          response.json({ id: `${Math.floor(Math.random() * 10000)}` });
        }, 500);
      });

      devServer.app.put("/api/v1/floors/*", (_, response) => {
        setTimeout(() => {
          response.send("ok");
        }, 500);
      });

      devServer.app.delete("/api/v1/floors/*", (_, response) => {
        setTimeout(() => {
          response.send("ok");
        }, 500);
      });

      devServer.app.post("/api/v1/rooms", (_, response) => {
        setTimeout(() => {
          response.json({ id: Math.floor(Math.random() * 10000) });
        }, 500);
      });

      devServer.app.put("/api/v1/rooms/*", (_, response) => {
        setTimeout(() => {
          response.send("ok");
        }, 500);
      });

      devServer.app.delete("/api/v1/rooms/*", (_, response) => {
        setTimeout(() => {
          response.send("ok");
        }, 500);
      });

      devServer.app.get("/api/v1/room-types", (_, response) => {
        setTimeout(() => {
          response.json([
            {
              name: "camera singola",
              minOccupancy: 1,
              maxOccupancy: 1
            },
            {
              name: "camera matrimoniale/doppia",
              minOccupancy: 1,
              maxOccupancy: 2
            },
            {
              name: "camera matrimoniale/doppia economy",
              minOccupancy: 1,
              maxOccupancy: 2
            },
            {
              name: "camera tripla",
              minOccupancy: 2,
              maxOccupancy: 3
            },
            {
              name: "camera tripla standard",
              minOccupancy: 2,
              maxOccupancy: 3
            },
            {
              name: "appartamento",
              minOccupancy: 3,
              maxOccupancy: 4
            },
          ]);
        }, 500);
      });

      devServer.app.get("/api/v1/tiles", (request, response) => {
        setTimeout(() => {
          const sessionId = request.query["sessionId"];

          if (!sessionId) {
            response.json({
              tiles: [
                {
                  id: "0",
                  bookingId: "0",
                  name: "Petr Ivanov",
                  from: "2022-09-15",
                  nights: 40,
                  roomType: "camera matrimoniale/doppia",
                  entity: "camera doppia",
                  persons: 2,
                  color: "booking1",
                  roomId: 2
                },
                {
                  id: "1",
                  bookingId: "1",
                  name: "Ivan Petrov",
                  from: "2022-10-25",
                  nights: 2,
                  roomType: "camera matrimoniale/doppia",
                  entity: "camera doppia",
                  persons: 2,
                  color: "booking2",
                  roomId: 1
                },
                {
                  id: "2",
                  bookingId: "2",
                  name: "Vasya Pupkin",
                  from: "2022-10-20",
                  nights: 3,
                  roomType: "camera matrimoniale/doppia",
                  entity: "camera doppia",
                  persons: 2,
                  color: "booking3",
                  roomId: 5
                },
                {
                  id: "3",
                  bookingId: "3",
                  name: "Petr Petrov",
                  from: "2022-10-01",
                  nights: 4,
                  roomType: "camera tripla",
                  entity: "camera tripla",
                  persons: 3,
                  color: "booking4"
                },
                {
                  id: "4",
                  bookingId: "4",
                  name: "Ivan Vasiliev",
                  from: "2022-10-28",
                  nights: 4,
                  roomType: "camera singola",
                  entity: "camera singola",
                  persons: 1,
                  color: "booking5"
                },
                {
                  id: "5",
                  bookingId: "5",
                  name: "Vasya Ivanov",
                  from: "2022-09-01",
                  nights: 60,
                  roomType: "camera matrimoniale/doppia",
                  entity: "camera doppia",
                  persons: 2,
                  color: "booking6"
                },
                {
                  id: "6",
                  bookingId: "1",
                  name: "Sasha Smirnov",
                  from: "2022-10-25",
                  nights: 2,
                  roomType: "camera matrimoniale/doppia",
                  entity: "camera doppia",
                  persons: 2,
                  color: "booking2",
                  roomId: 4
                },
                {
                  id: "7",
                  bookingId: "7",
                  name: "Sasha Smirnov",
                  from: "2022-10-23",
                  nights: 2,
                  roomType: "camera matrimoniale/doppia",
                  entity: "camera doppia",
                  persons: 2,
                  color: "booking3",
                  roomId: 4
                }
              ],
              sessionId: Math.floor(Math.random() * 10000)
            });
          } else {
            response.json({
              tiles: [],
              sessionId: sessionId
            });
          }
        }, 500);
      });

      devServer.app.post("/api/v1/changes", (_, response) => {
        setTimeout(() => {
          response.json("ok");
        }, 500);
      });

      return middlewares;
    }
  },
};
