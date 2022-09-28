import React from "react";
import { useAppSelector } from "../../../../../redux/hooks";
import Row from "../../Row";
import Body from "./Body";
import Header from "./Header";

type RoomProps = {
  id: string,
  isFirst: boolean,
  isLast: boolean
};

export default function Room({ id, isFirst, isLast }: RoomProps): JSX.Element {
  const room = useAppSelector((state) => state.rooms.data[id]);

  return (
    <Row>
      <Header room={room} />
      <Body isFirst={isFirst} isLast={isLast} roomId={id} />
    </Row>
  );
}
