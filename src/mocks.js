const mocks = {
  hotel: {
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
  },

  tiles: [
    {
      name: "Ivan Petrov",
      colour: "rgba(217, 73, 73, 0.69)",
      roomType: "doppia",
      roomNumber: 2,
      from: "20211225",
      nights: 2,
    },
    {
      name: "Vasya Pupkin",
      colour: "rgba(73, 122, 217, 0.69)",
      roomType: "doppia",
      roomNumber: 6,
      from: "20211220",
      nights: 3,
    },
  ],
};

export default mocks;
