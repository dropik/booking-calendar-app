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
  const [tableBounds, tableBoundsDispatch] = useReducer(tableBoundsReducer, getInitialTableBounds(date));

  const hotel = mocks.hotel;
  const tiles = mocks.tiles;

  useLayoutEffect(() => {
    function handleResize() {
      tableBoundsDispatch({ type: "resize" });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function recalculateOccupations(action) {
    var occupations = [];
    action.tiles.forEach(tile => {
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
        return tryMoveOccupation(occupations, action);
      case "dateChange":
        return recalculateOccupations(action);
      default:
        return occupations;
    }
  }

  const [occupations, occupationsDispatch] = useReducer(occupationsReducer, recalculateOccupations({ tiles: tiles }));

  function onDateChange(event) {
    var date = new Date(event.target.value);
    setDate(date);
    tableBoundsDispatch({ type: "dateChange", date: date });
    occupationsDispatch({ type: "dateChange", tiles: tiles });
  }

  function onTileMove(event) {
    occupationsDispatch({
      type: "move",
      x: event.x,
      y: event.y,
      pageY: event.pageY,
      hotel: hotel
    });
  }

  return(
    <div className="app">
      <Header date={date} startDate={tableBounds.startDate} onDateChange={onDateChange} columns={tableBounds.columns} />
      <Hotel hotel={hotel} />
      <TableContainer
        date={date}
        startDate={tableBounds.startDate}
        hotel={hotel}
        tiles={tiles}
        occupations={occupations}
        occupationsDispatch={occupationsDispatch}
        onTileMove={onTileMove}
        columns={tableBounds.columns}
      />
    </div>
  );
}

function tableBoundsReducer(bounds, action) {
  switch (action.type) {
    case "dateChange":
      return {
        startDate: calculateStartDate(action.date),
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

function tryMoveOccupation(occupations, action) {
  var margin = remToPx(8) + 1;
  var tableY = action.pageY - margin;
  var rowHeight = remToPx(4) + 1;
  var targetRow = Math.floor(tableY / rowHeight);
  var targetY = -1;

  const floors = action.hotel.floors;
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

    var newOrigRoomData = [...newOccupations[action.y]];
    var room = newOrigRoomData[action.x];
    newOrigRoomData[action.x] = undefined;
    newOccupations[action.y] = newOrigRoomData;

    var newDestRoomData = (newOccupations[targetY] === undefined) ? [] : [...newOccupations[targetY]];
    newDestRoomData[action.x] = room;
    newOccupations[targetY] = newDestRoomData;

    return newOccupations;
  } else {
    return occupations;
  }
}

function getInitialTableBounds(date) {
  return {
    startDate: calculateStartDate(date),
    columns: getInitialColumnsAmount(document.documentElement.clientWidth)
  }
}

function calculateStartDate(date) {
  let result = new Date(date.getTime());
  result.setDate(result.getDate() - GLOBALS.TABLE_PRELOAD_AMOUNT);
  return result;
}

function getInitialColumnsAmount(width) {
  let roomCellWidth = remToPx(6);
  let containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += GLOBALS.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

export default hot(module)(App);
