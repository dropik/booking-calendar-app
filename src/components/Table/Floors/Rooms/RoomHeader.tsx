import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { RoomData } from "../../../../redux/hotelSlice";

type Props = {
  room: RoomData
}

export default function RoomHeader({ room }: Props): JSX.Element {
  const theme = useTheme();
  const significantRoomType = room.type.replace("Camera ", "").replace("camera ", "");

  return (
    <Box sx={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      top: 0,
      bottom: 0,
      width: "5.5rem",
      pr: "1rem",
      pl: "1rem",
      borderRight: `1px solid ${theme.palette.outline.light}`
    }}>
      <Typography variant="labelLarge">{room.number}</Typography>
      <Typography
        sx={{
          textAlign: "center",
          overflowWrap: "anywhere"
        }}
        variant="bodySmall"
      >
        {significantRoomType}
      </Typography>
    </Box>
  );
}
