import React from "react";

import { Floor } from "../../../../redux/floorsSlice";

import Section from "..";
import RoomHeaders from "./RoomHeaders";
import RoomsTable from "./RoomsTable";

type FloorProps = {
  floor: Floor
}

export default function Floor({ floor }: FloorProps): JSX.Element {
  return (
    <Section header={floor.name}>
      <RoomHeaders floor={floor} />
      <RoomsTable floor={floor} />
    </Section>
  );
}
