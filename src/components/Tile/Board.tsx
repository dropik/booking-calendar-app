import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "../../redux/hooks";
import { TileContext } from "./context";

import BoardIcon from "./BoardIcon";

export default function Board(): JSX.Element {
  const theme = useTheme();
  const { data } = useContext(TileContext);
  const baseBoard: string = useAppSelector(state => data === undefined ? "" : state.roomRates.data[data.rateId].baseBoard ?? "");

  return (
    <Stack sx={{
      justifyContent: "flex-end"
    }}>
      <Typography variant="bodySmall">
        <BoardIcon baseBoard={baseBoard} fontSize={theme.typography.labelLarge.fontSize?.toString()} />
      </Typography>
    </Stack>
  );
}
