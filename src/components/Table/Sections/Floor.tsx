import React from "react";

import { FloorData } from "../../../redux/hotelSlice";

import Section from "./Section";
import Row from "./Row";
import RoomHeader from "./Row/RoomHeader";
import RoomBody from "./Row/RoomBody";

type FloorProps = {
  data: FloorData
}

export default function Floor({ data }: FloorProps): JSX.Element {
  return (
    <Section header={data.name}>
      {
        data.rooms.map((room, index) => (
          <Row key={room.number}>
            <RoomHeader room={room} />
            <RoomBody isLast={index === data.rooms.length - 1} roomNumber={room.number} />
          </Row>
        ))
      }
    </Section>
  );
}
