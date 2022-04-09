import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import GuestRow from "./GuestRow";
import RoomContainer from "./RoomContainer";

type Props = {
  data: Api.BookingData
};

function BookingDialogBodyData(props: Props): JSX.Element {
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
        {props.data.rooms.map(room => (
          <RoomContainer key={room.id} data={room}>
            {room.guests.map(guest => <GuestRow key={guest.id} data={guest}/>)}
          </RoomContainer>
        ))}
      </div>
    </>
  );
}

export default hot(module)(BookingDialogBodyData);
