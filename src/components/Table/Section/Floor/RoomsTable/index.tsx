import React, { useEffect, useMemo, useRef } from "react";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { Floor } from "../../../../../redux/floorsSlice";
import { scrollX } from "../../../../../redux/tableSlice";

import Room from "./Room";

type RoomTableProps = {
  floor: Floor,
};

export default function RoomTable({ floor }: RoomTableProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);

  function onScroll(event: React.UIEvent<HTMLDivElement>): void {
    const scrollLeft = event.currentTarget?.scrollLeft;
    if (scrollLeft !== undefined && scrollLeft !== null) {
      dispatch(scrollX(scrollLeft));
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(scrollLeft, 0);
    }
  }, [scrollLeft]);

  const roomsMemo = useMemo(() => (
    floor.roomIds.map((roomId, index) => (
      <Room key={roomId} isFirst={index === 0} isLast={index === floor.roomIds.length - 1} roomId={roomId} />
    ))
  ), [floor]);

  return (
    <Stack ref={ref} onScroll={onScroll} sx={{
      flexGrow: 1,
      maxWidth: "calc(100% - 7.5rem - 1px)",
      overflowX: "scroll",
    }}>
      {roomsMemo}
    </Stack>
  );
}
