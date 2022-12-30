import React from "react";
import Stack from "@mui/material/Stack";

import { useAppDispatch } from "../../../../../redux/hooks";
import { Floor } from "../../../../../redux/floorsSlice";
import { scrollX } from "../../../../../redux/tableSlice";

import Room from "./Room";

type RoomTableProps = {
  floor: Floor,
};

export default function RoomTable({ floor }: RoomTableProps): JSX.Element {
  const dispatch = useAppDispatch();

  function onScroll(event: React.UIEvent<HTMLDivElement>): void {
    const scrollLeft = event.currentTarget?.scrollLeft;
    if (scrollLeft !== undefined && scrollLeft !== null) {
      dispatch(scrollX(scrollLeft));
    }
  }

  return (
    <Stack onScroll={onScroll} sx={{
      flexGrow: 1,
      maxWidth: "calc(100% - 7.5rem - 1px)",
      overflowX: "scroll",
    }}>
      {floor.roomIds.map((roomId, index) => (
        <Room key={roomId} isFirst={index === 0} isLast={index === floor.roomIds.length - 1} roomId={roomId} />
      ))}
    </Stack>
  );
}
