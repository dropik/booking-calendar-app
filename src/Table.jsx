import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import Room from "./Room";
import "./Table.css";

function Table({ hotel, occupations, tiles, onTileMove }) {
  var rows = [];

  hotel.floors.forEach(floor => {
    floor.rooms.forEach((room, roomIndex) => {
      rows.push(
        <Room
          key={room.number}
          y={room.number}
          roomData={occupations[room.number]}
          tiles={tiles}
          onTileMove={onTileMove}
          isFirst={roomIndex == 0}
        />
      );
    });
  });

  return <div className="table">{rows}</div>;
}

Table.propTypes = {
  hotel: PropTypes.exact({
    floors: PropTypes.array
  }).isRequired,
  occupations: PropTypes.array.isRequired,
  tiles: PropTypes.array.isRequired,
  onTileMove: PropTypes.func.isRequired
};

export default hot(module)(Table);
