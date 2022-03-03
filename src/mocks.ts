import * as HotelSlice from "./redux/hotelSlice";
import * as TilesSlice from "./redux/tilesSlice";
import * as RoomTypesSlice from "./redux/roomTypesSlice";

export const hotel: HotelSlice.HotelData = {
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
  ],
};

export const tiles: TilesSlice.TileData[] = [
  {
    id: "0",
    name: "Petr Ivanov",
    colour: "rgba(208, 217, 73, 0.69)",
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    roomNumber: 3,
    from: "2022-02-15",
    nights: 40,
    persons: 2
  },
  {
    id: "1",
    name: "Ivan Petrov",
    colour: "rgba(217, 73, 73, 0.69)",
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    roomNumber: 2,
    from: "2022-02-25",
    nights: 2,
    persons: 2
  },
  {
    id: "2",
    name: "Vasya Pupkin",
    colour: "rgba(73, 122, 217, 0.69)",
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    roomNumber: 6,
    from: "2022-02-20",
    nights: 3,
    persons: 2
  },
];

export const roomTypes: RoomTypesSlice.RoomTypeData = {};
roomTypes["camera singola"] = [1];
roomTypes["camera matrimoniale/doppia"] = [1, 2];
roomTypes["camera matrimoniale/doppia economy"] = [1, 2];
roomTypes["camera tripla"] = [2, 3];
roomTypes["camera tripla standard"] = [2, 3];
roomTypes["appartamento"] = [3, 4];
