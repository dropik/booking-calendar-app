import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import M3IconButton from "../../m3/M3IconButton";

type FloorHeaderProps = {
  name: string,
  collapseCallback: () => void
};

export default function FloorHeader({ name, collapseCallback }: FloorHeaderProps): JSX.Element {
  const [iconState, setIconState] = useState(true);
  const capitalizedFloor = getCapitalizedName(name);

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pl: "2rem",
      pr: "2rem",
      pt: "1rem",
      pb: "1rem"
    }}>
      <Typography variant="headlineMedium">{capitalizedFloor}</Typography>
      <M3IconButton onClick={() => {
        collapseCallback();
        setIconState(!iconState);
      }}>
        {iconState ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
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
