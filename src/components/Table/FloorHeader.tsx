import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import M3IconButton from "../m3/M3IconButton";

type FloorHeaderProps = {
  name: string
}

export default function FloorHeader({ name }: FloorHeaderProps): JSX.Element {
  const theme = useTheme();
  const capitalizedFloor = getCapitalizedName(name);

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pl: "2rem",
      pr: "2rem",
      pt: "1rem",
      pb: "1rem",
      borderBottom: `1px solid ${theme.palette.outline.light}`
    }}>
      <Typography variant="headlineMedium">{capitalizedFloor}</Typography>
      <M3IconButton>
        <ExpandLessOutlinedIcon />
      </M3IconButton>
    </Box>
  );
}

function getCapitalizedName(name: string): string {
  const nameParts = name.split(" ");
  let capitalized = "";
  for (const part of nameParts) {
    capitalized += `${part[0].toLocaleUpperCase()}${part.substring(1)} `;
  }
  capitalized.trimEnd();
  return capitalized;
}
