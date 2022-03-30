import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import * as Utils from "../../utils";

import "./BookingDialogBody.css";

type Props = {
  data: Api.BookingData
}

function BookingDialogBody(props: Props): JSX.Element {
  const rooms: JSX.Element[] = props.data.rooms.map(room => {
    const guests: JSX.Element[] = room.guests.map(guest => {
      return (
        <div key={guest.id} className="row person button">
          <div>{guest.name}</div>
          <div>{guest.surname}</div>
          <div>{new Date(guest.dateOfBirth).toLocaleDateString()}</div>
        </div>
      );
    });

    const assigned = room.roomNumber === undefined ?
      "Non assegnata" :
      `Camera ${room.roomNumber}`;

    return (
      <div key={room.id} className="room-container">
        <h4>{Utils.getFullRoomType(room.entity, room.type)}</h4>
        <div className="room-info">
          ({new Date(room.from).toLocaleDateString()} - {new Date(room.to).toLocaleDateString()}) -&nbsp;
          {assigned}
        </div>
        {guests}
      </div>
    );
  });

  return (
    <>
      <div className="row">
        <div className="field-label">Dal:</div>
        <div><b>{new Date(props.data.from).toLocaleDateString()}</b></div>
      </div>
      <div className="row">
        <div className="field-label">Al:</div>
        <div><b>{new Date(props.data.to).toLocaleDateString()}</b></div>
      </div>
      <h3 className="sub-header">Stanze</h3>
      <hr />
      <div className="rooms-container">
        {rooms}
      </div>
    </>
  );
}

export default hot(module)(BookingDialogBody);
