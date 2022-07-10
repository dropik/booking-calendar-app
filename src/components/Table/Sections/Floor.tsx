import React from "react";

import { FloorData } from "../../../redux/hotelSlice";

import Section from "./Section";
import Room from "./Room";

type FloorProps = {
  data: FloorData
}

export default function Floor({ data }: FloorProps): JSX.Element {
  return (
    <Section header={data.name}>
      {
        data.rooms.map((room, index) => (
          <Room key={room.number} data={room} isLast={index === data.rooms.length - 1} />
        ))
      }
    </Section>
  );
}
