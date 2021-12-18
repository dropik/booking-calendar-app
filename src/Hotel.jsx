import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";
import Floor from "./Floor";
import RoomNumber from "./RoomNumber";
import "./Hotel.css";
import "./RoomNumber.css";

function Hotel({ hotel }) {
  var rows = [];

  hotel.floors.forEach((floor, index) => {
    rows.push(
      <Floor key={floor.name} name={floor.name} isFollowing={index > 0} />
    );

    floor.rooms.forEach(room => {
      rows.push(<RoomNumber number={room.number} key={room.number} />);
    });
  });

  return <div className="hotel">{rows}</div>;
}

Hotel.propTypes = {
  hotel: PropTypes.exact({
    floors: PropTypes.array
  }).isRequired
};

export default hot(module)(Hotel);
