import React from "react";

import * as Api from "../../api";

import DescriptionRow from "./DescriptionRow";
import ClientButtonRow from "./ClientButtonRow";
import RoomContainer from "./RoomContainer";

type Props = {
  data: Api.BookingData
};

export default function BookingDialogBody({ data }: Props): JSX.Element {
  const fromDateString = new Date(data.from).toLocaleDateString();
  const toDateString = new Date(data.to).toLocaleDateString();

  return (
    <>
      <DescriptionRow name="Dal" value={fromDateString} />
      <DescriptionRow name="Al" value={toDateString} />
      <h3 className="sub-header">Stanze</h3>
      <hr />
      <div className="rooms-container">
        {data.rooms.map(room => (
          <RoomContainer key={room.id} data={room}>
            {room.guests.map(guest => (
              <ClientButtonRow key={guest.id} bookingId={data.id} client={guest}/>
            ))}
          </RoomContainer>
        ))}
      </div>
    </>
  );
}
