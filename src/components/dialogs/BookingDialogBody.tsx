import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DescriptionRow from "./DescriptionRow";
import GuestRow from "./GuestRow";
import RoomContainer from "./RoomContainer";

type Props = {
  data: Api.BookingData
};

function BookingDialogBody(props: Props): JSX.Element {
  const fromDateString = new Date(props.data.from).toLocaleDateString();
  const toDateString = new Date(props.data.to).toLocaleDateString();

  return (
    <>
      <DescriptionRow name="Dal" value={fromDateString} />
      <DescriptionRow name="Al" value={toDateString} />
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
