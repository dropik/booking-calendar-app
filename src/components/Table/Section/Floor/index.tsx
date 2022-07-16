import React from "react";

import { FloorData } from "../../../../redux/hotelSlice";

import Section from "..";
import Row from "../Row";
import Header from "./Room/Header";
import Body from "./Room/Body";

type FloorProps = {
  data: FloorData
}

export default function Floor({ data }: FloorProps): JSX.Element {
  return (
    <Section header={data.name}>
      {
        data.rooms.map((room, index) => (
          <Row key={room.number}>
            <Header room={room} />
            <Body isLast={index === data.rooms.length - 1} roomNumber={room.number} />
          </Row>
        ))
      }
    </Section>
  );
}
