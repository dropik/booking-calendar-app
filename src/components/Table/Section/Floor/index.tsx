import React from "react";

import { Floor } from "../../../../redux/floorsSlice";

import Section from "..";
import Room from "./Room";

type FloorProps = {
  floor: Floor
}

export default function Floor({ floor }: FloorProps): JSX.Element {
  return (
    <Section header={floor.name}>
      {floor.roomIds.map((roomId, index) => (
        <Room key={roomId} id={roomId} isFirst={index === 0} isLast={index === floor.roomIds.length - 1} />)
      )}
    </Section>
  );
}
