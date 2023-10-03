import React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppSelector, useFloorRoomIds, useFloors } from "../../redux/hooks";

export default function PanoramicView(): JSX.Element {
  const theme = useTheme();
  const floors = useFloors();
  const floorIds = Object.keys(floors).map(Number);

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
          }}>
            {floorIds.map((floorId, index) => <FloorHeader key={floorId} floorId={floorId} isLast={index === floorIds.length - 1} />)}
          </Stack>
          <Box sx={{
            position: "relative",
            overflow: "hidden",
            flex: 1,
          }}>
            <Box sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflowX: "auto",
            }}></Box>
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
