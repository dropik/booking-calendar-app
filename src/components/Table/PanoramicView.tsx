import React, { useEffect, useRef } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector, useDates, useFloorRoomIds, useFloors } from "../../redux/hooks";
import { scrollX } from "../../redux/tableSlice";

export default function PanoramicView(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);
  const floors = useFloors();

  const floorIds = Object.keys(floors).map(Number);

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
            width: "calc(7.5rem - 1px)",
            borderRight: `1px solid ${theme.palette.outline.main}`,
            overflowX: "scroll",
          }}>
            {floorIds.map((floorId, index) => <FloorHeader key={floorId} floorId={floorId} isLast={index === floorIds.length - 1} />)}
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
              {floorIds.map((floorId, index) => <FloorContent key={floorId} floorId={floorId} isLast={index === floorIds.length - 1} />)}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

type FloorHeaderProps = {
  floorId: number,
  isLast: boolean,
};

function FloorHeader({ floorId, isLast }: FloorHeaderProps): JSX.Element {
  const theme = useTheme();
  const roomIds = useFloorRoomIds(floorId);
  const floor = useAppSelector(state => state.floors.data[floorId]);

  return (
    <Stack justifyContent="space-between" sx={{
      position: "relative",
      flex: roomIds.length,
      pl: "1rem",
      pr: "1rem",
      borderBottom: !isLast ? `1px dashed ${theme.palette.outline.main}` : undefined,
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
  isLast: boolean,
};

function FloorContent({ floorId, isLast }: FloorContentProps): JSX.Element {
  const theme = useTheme();
  const roomIds = useFloorRoomIds(floorId);
  const dates = useDates();

  return (
    <Stack justifyContent="space-between" sx={{
      flex: roomIds.length,
      borderBottom: !isLast ? `1px dashed ${theme.palette.outline.main}` : undefined,
      width: "fit-content",
    }}>
      {roomIds.map(roomId => (
        <Stack key={roomId} direction="row" sx={{ flex: 1 }}>
          {dates.map(day => <Box key={day} sx={{ width: "calc(8rem + 1px)" }}></Box>)}
        </Stack>
      ))}
    </Stack>
  );
}
