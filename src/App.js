import React, { useLayoutEffect, useState, useReducer } from "react";
import { hot } from "react-hot-loader";
import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";
import { daysBetweenDates, remToPx } from "./utils";
import GLOBALS from "./globals";
import mocks from "./mocks";
import "./App.css";

function App(props) {
  const [date, setDate] = useState(new Date());

  function tableBoundsReducer(bounds, action) {
    switch (action.type) {
      case "dateChange":
        return {
          startDate: calculateStartDate(date),
          columns: getInitialColumnsAmount(document.documentElement.clientWidth)
        };
      case "resize":
        return {
          startDate: bounds.startDate,
          columns: getInitialColumnsAmount(document.documentElement.clientWidth)
        };
      default:
        return bounds;
    }
  }

  const [tableBounds, tableBoundsDispatch] = useReducer(tableBoundsReducer, {
    startDate: calculateStartDate(date),
    columns: getInitialColumnsAmount(document.documentElement.clientWidth)
  });

  const hotel = mocks.hotel;
  const tiles = mocks.tiles;

  function handleResize() {
    tableBoundsDispatch({ type: "resize" });
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleMove(occupations, x, y, pageY) {
    var margin = remToPx(8) + 1;
    var tableY = pageY - margin;
    var rowHeight = remToPx(4) + 1;
    var targetRow = Math.floor(tableY / rowHeight);
    var targetY = -1;

    const floors = hotel.floors;
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
      var x = daysBetweenDates(tableBounds.startDate, fromDate);
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
        return occupations;
    }
  }

  const [occupations, occupationsDispatch] = useReducer(occupationsReducer, recalculateOccupations());

  function handleDateChange(event) {
    var date = new Date(event.target.value);
    setDate(date);
    tableBoundsDispatch({ type: "dateChange" });
    occupationsDispatch({type: "dateChange"});
  }

  return(
    <div className="app">
      <Header date={date} startDate={tableBounds.startDate} onDateChange={handleDateChange} columns={tableBounds.columns} />
      <Hotel hotel={hotel} />
      <TableContainer
        date={date}
        startDate={tableBounds.startDate}
        hotel={hotel}
        tiles={tiles}
        occupations={occupations}
        occupationsDispatch={occupationsDispatch}
        columns={tableBounds.columns}
      />
    </div>
  );
}

function getInitialColumnsAmount(width) {
  let roomCellWidth = remToPx(6);
  let containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += GLOBALS.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

function calculateStartDate(date) {
  let result = new Date(date.getTime());
  result.setDate(result.getDate() - GLOBALS.TABLE_PRELOAD_AMOUNT);
  return result;
}

export default hot(module)(App);
