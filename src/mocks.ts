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
    from: "2022-02-15",
    nights: 40,
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    persons: 2,
    colour: "rgba(208, 217, 73, 0.69)",
    roomNumber: 3
  },
  {
    id: "1",
    name: "Ivan Petrov",
    from: "2022-02-25",
    nights: 2,
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    persons: 2,
    colour: "rgba(217, 73, 73, 0.69)",
    roomNumber: 2
  },
  {
    id: "2",
    name: "Vasya Pupkin",
    from: "2022-02-20",
    nights: 3,
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    persons: 2,
    colour: "rgba(73, 122, 217, 0.69)",
    roomNumber: 6
  },
  {
    id: "3",
    name: "Petr Petrov",
    from: "2022-03-01",
    nights: 4,
    roomType: "camera tripla",
    entity: "camera tripla",
    persons: 3,
    colour: "rgba(73, 122, 217, 0.69)"
  },
  {
    id: "4",
    name: "Ivan Vasiliev",
    from: "2022-02-28",
    nights: 4,
    roomType: "camera singola",
    entity: "camera singola",
    persons: 1,
    colour: "rgba(217, 73, 73, 0.69)"
  },
  {
    id: "5",
    name: "Vasya Ivanov",
    from: "2022-03-01",
    nights: 60,
    roomType: "camera matrimoniale/doppia",
    entity: "camera doppia",
    persons: 2,
    colour: "rgba(208, 217, 73, 0.69)"
  }
];

export const roomTypes: RoomTypesSlice.RoomTypeData = {};
roomTypes["camera singola"] = [1];
roomTypes["camera matrimoniale/doppia"] = [1, 2];
roomTypes["camera matrimoniale/doppia economy"] = [1, 2];
roomTypes["camera tripla"] = [2, 3];
roomTypes["camera tripla standard"] = [2, 3];
roomTypes["appartamento"] = [3, 4];
