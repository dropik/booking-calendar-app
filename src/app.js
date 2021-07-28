import React, { useLayoutEffect, useState, useReducer } from "react";
import { hot } from "react-hot-loader";
import Table from "./table";
import Header from "./header";
import "./app.css";
import { remToPx } from "./utils";

function App(props) {
  const [width, height] = useWindowSize();
  var roomCellWidth = remToPx(6);
  var containerWidth = remToPx(4);
  var columns = Math.ceil((width - roomCellWidth) / containerWidth);

  const [date, setDate] = useState(new Date());

  const rooms = {
    "floors": [
      {
        "name": "piano 1",
        "rooms": [
          {
            "number": 1,
            "type": "camera tripla standard"
          },
          {
            "number": 2,
            "type": "appartamento"
          },
          {
            "number": 3,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 4,
            "type": "camera tripla"
          },
          {
            "number": 5,
            "type": "camera matrimoniale/doppia"
          }
        ]
      },
      {
        "name": "piano 2",
        "rooms": [
          {
            "number": 6,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 7,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 8,
            "type": "camera singola"
          },
          {
            "number": 9,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 10,
            "type": "camera matrimoniale/doppia economy"
          },
          {
            "number": 11,
            "type": "camera tripla"
          },
          {
            "number": 12,
            "type": "camera matrimoniale/doppia"
          }
        ]
      }
    ]
  };

  const tiles = [
    {
      name: "Ivan Petrov",
      colour: "rgba(217, 73, 73, 0.69)",
      roomType: "doppia",
      roomNumber: 2,
      from: "20210729",
      nights: 2
    }
  ];

  function handleMove(occupations, x, y, pageY) {
    var margin = remToPx(8) + 1;
    var tableY = pageY - margin;
    var rowHeight = remToPx(4) + 1;
    var targetRow = Math.floor(tableY / rowHeight);
    var targetY = -1;

    const floors = rooms.floors;
    const length = floors.length;
    for (var i = 0; i < length; i++) {
      const floor = floors[i];

      if (targetRow == 0) {
        break;
      }
      targetRow--;

      const rooms = floor.rooms;
      const length = rooms.length;
      for (var j = 0; j < length; j++) {
        const room = floor.rooms[j];

        if (targetRow == 0) {
          targetY = room.number;
          break;
        }
        targetRow--;
      }
    }

    if (targetY > 0) {
      var newOccupations = [...occupations];

      var newOrigRoomData = [...newOccupations[y]];
      var room = newOrigRoomData[x];
      newOrigRoomData[x] = undefined;
      newOccupations[y] = newOrigRoomData;

      var newDestRoomData = (newOccupations[targetY] === undefined) ? [] : [...newOccupations[targetY]];
      newDestRoomData[x] = room;
      newOccupations[targetY] = newDestRoomData;

      return newOccupations;
    } else {
      return occupations;
    }
  }

  function recalculateOccupations() {
    var occupations = [];
    tiles.forEach(tile => {
      var roomNumber = tile.roomNumber;
      var row = occupations[roomNumber];
      if (row === undefined) {
        row = [];
      }
      var fromDate = new Date(Date.parse(tile.from.substr(0, 4) + '-' + tile.from.substr(4, 2) + '-' + tile.from.substr(6, 2)));
      var x = Math.ceil((fromDate - date) / 86400000);
      row[x] = tile;
      occupations[roomNumber] = row;
    });
    return occupations;
  }

  function occupationsReducer(occupations, action) {
    switch (action.type) {
      case "move":
        return handleMove(occupations, action.x, action.y, action.pageY);
      case "dateChange":
        return recalculateOccupations();
      default:
        break;
    }
  }

  const [occupations, occupationsDispatch] = useReducer(occupationsReducer, recalculateOccupations());

  function handleDateChange(event) {
    var date = new Date(event.target.value);
    setDate(date);
    occupationsDispatch({type: "dateChange"});
  }

  return(
    <div className="app">
      <Header date={date} onDateChange={handleDateChange} columns={columns} />
      <Table date={date} rooms={rooms} tiles={tiles} occupations={occupations} occupationsDispatch={occupationsDispatch} columns={columns} />
    </div>
  );
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([document.documentElement.clientWidth, document.documentElement.clientHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default hot(module)(App);
