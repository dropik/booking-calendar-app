import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DescriptionRow from "./DescriptionRow";
import RoomContainer from "./RoomContainer";
import GuestRow from "./GuestRow";

import "./DescriptiveDialog.css";

type Props = {
  data?: Api.BookingData
};

function BookingDialogBody(props: Props): JSX.Element {
  if (!props.data) {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  }

  return (
    <>
      <DescriptionRow name="Dal" value={new Date(props.data.from).toLocaleDateString()} />
      <DescriptionRow name="Al" value={new Date(props.data.to).toLocaleDateString()} />
      <h3 className="sub-header">Stanze</h3>
      <hr />
      <div className="rooms-container">
        {props.data.rooms.map(room => (
          <RoomContainer key={room.id} data={room}>
            {room.guests.map(guest => (
              <GuestRow key={guest.id} data={guest}/>
            ))}
          </RoomContainer>
        ))}
      </div>
    </>
  );
}

export default hot(module)(BookingDialogBody);
