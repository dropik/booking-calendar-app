import React from "react";

import { Floor } from "../../../../redux/floorsSlice";

import Section from "..";
import Room from "./Room";

type FloorProps = {
  data: Floor
}

export default function Floor({ data }: FloorProps): JSX.Element {
  const roomIds = Object.keys(data.rooms);

  return (
    <Section header={data.name}>
      {roomIds.map((roomId, index) => (
        <Room key={roomId} id={roomId} isFirst={index === 0} isLast={index === roomIds.length - 1} />)
      )}
    </Section>
  );
}
