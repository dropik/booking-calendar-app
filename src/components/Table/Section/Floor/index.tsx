import React from "react";

import { Floor } from "../../../../redux/floorsSlice";

import Section from "..";
import Row from "../Row";
import Header from "./Room/Header";
import Body from "./Room/Body";

type FloorProps = {
  data: Floor
}

export default function Floor({ data }: FloorProps): JSX.Element {
  const roomIds = Object.keys(data.rooms);

  return (
    <Section header={data.name}>
      {
        roomIds.map((roomId, index) => {
          const room = data.rooms[roomId];

          return (
            <Row key={roomId}>
              <Header room={room} />
              <Body
                isFirst={index === 0}
                isLast={index === roomIds.length - 1}
                roomId={roomId}
              />
            </Row>
          );
        })
      }
    </Section>
  );
}
