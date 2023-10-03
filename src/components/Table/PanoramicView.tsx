import React, { memo, useEffect, useMemo, useRef } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector, useDates, useFloorRoomIds, useFloors } from "../../redux/hooks";
import { scrollX } from "../../redux/tableSlice";
import { Utils } from "../../utils";

export default function PanoramicView(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);
  const floors = useFloors();

  const floorIds = Object.keys(floors).map(Number);

  const floorSections = useMemo(() => (
    floorIds.map((floorId) => <FloorContent key={floorId} floorId={floorId} />)
  ), [floorIds]);

  function scroll(event: React.UIEvent<HTMLDivElement>): void {
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

  return (
    <Box sx={{
      position: "relative",
      overflow: "hidden",
      flex: 1,
      width: "100%",
    }}>
      <Box sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: "hidden",
      }}>
        <Stack direction="row" sx={{
          height: "100%"
        }}>
          <Stack justifyContent="space-between" sx={{
            width: "7.5rem",
            borderRight: `1px solid ${theme.palette.outline.main}`,
            overflowX: "scroll",
          }}>
            {floorIds.map((floorId) => <FloorHeader key={floorId} floorId={floorId} />)}
          </Stack>
          <Box sx={{
            position: "relative",
            overflow: "hidden",
            flex: 1,
          }}>
            <Box onScroll={scroll} ref={ref} sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflowX: "auto",
              display: "flex",
              flexDirection: "column",
            }}>
              {floorSections}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

type FloorHeaderProps = {
  floorId: number,
};

function FloorHeader({ floorId }: FloorHeaderProps): JSX.Element {
  const theme = useTheme();
  const roomIds = useFloorRoomIds(floorId);
  const floor = useAppSelector(state => state.floors.data[floorId]);

  return (
    <Stack justifyContent="space-between" sx={{
      position: "relative",
      flex: roomIds.length,
      pl: "1rem",
      pr: "1rem",
      borderTop: `1px dashed ${theme.palette.outline.main}`,
    }}>
      {roomIds.map(roomId => <Box key={roomId} sx={{ flex: 1 }}></Box>)}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography variant="titleLarge" sx={{
          writingMode: "vertical-lr",
          transform: "rotate(-180deg)",
        }}>{floor.name}</Typography>
      </Box>
    </Stack>
  );
}

type FloorContentProps = {
  floorId: number,
};

const FloorContent = memo(function FloorContent({ floorId }: FloorContentProps): JSX.Element {
  const theme = useTheme();
  const roomIds = useFloorRoomIds(floorId);

  const rooms = useMemo(() => (
    roomIds.map(roomId => <RoomContent key={roomId} roomId={roomId} />)
  ), [roomIds]);

  return (
    <Stack justifyContent="space-between" sx={{
      flex: roomIds.length,
      borderTop: `1px dashed ${theme.palette.outline.main}`,
      width: "fit-content",
    }}>
      {rooms}
    </Stack>
  );
});

type RoomContentProps = {
  roomId: number,
};

const RoomContent = memo(function RoomContent({ roomId }: RoomContentProps): JSX.Element {
  const dates = useDates();

  const cells = useMemo(() => dates.map((day, index) => (
    <PanoramicViewCell
      key={day}
      roomId={roomId}
      day={day}
      prevDay={index === 0 ? Utils.getDateShift(day, -1) : dates[index - 1]}
      isLast={index === dates.length - 1} />
  )), [dates, roomId]);

  return (
    <Stack direction="row" sx={{
      flex: 1
    }}>
      {cells}
    </Stack>
  );
});

type PanoramicViewCellProps = {
  roomId: number,
  day: string,
  prevDay: string,
  isLast: boolean,
};

const PanoramicViewCell = memo(function PanoramicViewCell({ roomId, day, prevDay, isLast }: PanoramicViewCellProps): JSX.Element {
  const theme = useTheme();
  const currentTileId = useAppSelector(state => state.tiles.assignedMap[roomId][day]);
  const prevTileId = useAppSelector(state => state.tiles.assignedMap[roomId][prevDay]);
  const currentTile = useAppSelector(state => currentTileId === undefined ? undefined : state.tiles.data[currentTileId]);
  const prevTile = useAppSelector(state => prevTileId === undefined ? undefined : state.tiles.data[prevTileId]);

  return (
    <Stack direction="row" sx={{
      width: "8rem",
      borderRight: !isLast ? (
        currentTile ? `1px solid ${theme.palette[`${currentTile.color}Container`].main}` : `1px solid ${theme.palette.surfaceVariant.light}`
      ) : undefined,
    }}>
      <Box sx={{
        flex: 1,
        backgroundColor: prevTile ? theme.palette[`${prevTile.color}Container`].main : undefined,
      }}></Box>
      <Box sx={{
        flex: 1,
        backgroundColor: currentTile ? theme.palette[`${currentTile.color}Container`].main : undefined,
      }}></Box>
    </Stack>
  );
});
