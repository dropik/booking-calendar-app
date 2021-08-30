import React, { useLayoutEffect, useReducer } from "react";
import { hot } from "react-hot-loader";
import Header from "./Header";
import Hotel from "./Hotel";
import TableContainer from "./TableContainer";
import { daysBetweenDates, remToPx } from "./utils";
import globals from "./globals";
import mocks from "./mocks";
import "./App.css";

function App(props) {
  const hotel = mocks.hotel;
  const tiles = mocks.tiles;
  const [store, storeDispatch] = useReducer(storeReducer, getInitialStore(tiles));

  useColumnsAdjustment(storeDispatch);

  function onDateChange(event) {
    storeDispatch({
      type: "dateChange",
      date: new Date(event.target.value),
      tiles: tiles
    });
  }

  function onTileMove(event) {
    storeDispatch({
      type: "move",
      x: event.x,
      y: event.y,
      pageY: event.pageY,
      hotel: hotel
    });
  }

  function onScroll(event) {
    storeDispatch({
      type: "currentDate/scroll",
      scrollLeft: event.target.scrollLeft
    });
    
    let cellWidth = remToPx(4) + 1;
    let scrollLimit = cellWidth * globals.TABLE_FETCH_BREAKPOINT;
    if (event.target.scrollLeft < scrollLimit) {
      storeDispatch({
        type: "fetchLeft",
        tiles: tiles
      });
      var preloadedWidth = cellWidth * globals.TABLE_PRELOAD_AMOUNT;
      event.target.scrollLeft = preloadedWidth + scrollLimit + 1;
    } else if (event.target.scrollLeft > event.target.scrollLeftMax - scrollLimit) {
      storeDispatch({
        type: "fetchRight",
        tiles: tiles
      });
    }
  }

  return(
    <div className="app">
      <Header
        currentDate={store.currentDate}
        startDate={store.startDate}
        onDateChange={onDateChange}
        columns={store.columns}
      />
      <Hotel hotel={hotel} />
      <TableContainer
        date={store.date}
        startDate={store.startDate}
        hotel={hotel}
        tiles={tiles}
        occupations={store.occupations}
        onTileMove={onTileMove}
        columns={store.columns}
        onScroll={onScroll}
        canSnapScroll={store.canSnapScroll}
      />
    </div>
  );
}

function storeReducer(store, action) {
  switch (action.type) {
    case "currentDate/scroll":
    {
      let cellWidth = remToPx(4) + 1;
      let newCurrentDate = new Date(store.startDate);
      let dateShift = Math.floor((action.scrollLeft + cellWidth / 2) / cellWidth);
      newCurrentDate.setDate(newCurrentDate.getDate() + dateShift);
      return {
        ...store,
        currentDate: newCurrentDate
      };
    }
    case "dateChange":
    {
      let startDate = calculateStartDate(action.date);
      return {
        date: action.date,
        currentDate: action.date,
        startDate: startDate,
        columns: getInitialColumnsAmount(document.documentElement.clientWidth),
        occupations: recalculateOccupations(action.tiles, startDate)
      };
    }
    case "resize":
      return {
        ...store,
        columns: getInitialColumnsAmount(document.documentElement.clientWidth)
      };
    case "move":
      return {
        ...store,
        occupations: tryMoveOccupation(store.occupations, action)
      };
    case "fetchLeft":
    {
      let startDate = calculateStartDate(store.startDate);
      return {
        ...store,
        startDate: startDate,
        columns: store.columns + globals.TABLE_PRELOAD_AMOUNT,
        occupations: recalculateOccupations(action.tiles, startDate)
      };
    }
    case "fetchRight":
      return {
        ...store,
        columns: store.columns + globals.TABLE_PRELOAD_AMOUNT,
        occupations: recalculateOccupations(action.tiles, store.startDate)
      };
    default:
      return store;
  }
}

function getInitialStore(tiles) {
  var date = new Date();
  var startDate = calculateStartDate(date);
  return {
    date: date,
    currentDate: date,
    startDate: startDate,
    columns: getInitialColumnsAmount(document.documentElement.clientWidth),
    occupations: recalculateOccupations(tiles, startDate),
    canSnapScroll: true
  }
}

function useColumnsAdjustment(storeDispatch) {
  useLayoutEffect(() => {
    function handleResize() {
      storeDispatch({ type: "resize" });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
}

function recalculateOccupations(tiles, startDate) {
  var occupations = [];
  tiles.forEach(tile => {
    var roomNumber = tile.roomNumber;
    var row = occupations[roomNumber];
    if (row === undefined) {
      row = [];
    }
    var fromDate = new Date(Date.parse(tile.from.substr(0, 4) + '-' + tile.from.substr(4, 2) + '-' + tile.from.substr(6, 2)));
    var x = daysBetweenDates(startDate, fromDate);
    row[x] = tile;
    occupations[roomNumber] = row;
  });
  return occupations;
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

function calculateStartDate(date) {
  let result = new Date(date.getTime());
  result.setDate(result.getDate() - globals.TABLE_PRELOAD_AMOUNT);
  return result;
}

function getInitialColumnsAmount(width) {
  let roomCellWidth = remToPx(6);
  let containerWidth = remToPx(4);
  let columns = Math.ceil((width - roomCellWidth) / containerWidth);
  columns += globals.TABLE_PRELOAD_AMOUNT * 2;
  return columns;
}

export default hot(module)(App);
