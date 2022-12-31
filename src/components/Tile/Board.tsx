import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FreeBreakfastOutlined from "@mui/icons-material/FreeBreakfastOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import BedOutlined from "@mui/icons-material/BedOutlined";

import { useAppSelector } from "../../redux/hooks";
import { TileContext } from "./context";

export default function Board(): JSX.Element {
  const { data } = useContext(TileContext);
  const baseBoard: string = useAppSelector(state => data === undefined ? "" : state.roomRates.data[data.rateId].baseBoard ?? "");

  return (
    <Stack sx={{
      justifyContent: "flex-end"
    }}>
      <Typography variant="bodySmall">
        <BoardIcon baseBoard={baseBoard} />
      </Typography>
    </Stack>
  );
}

type BoardIconProps = {
  baseBoard: string,
};

function BoardIcon({ baseBoard }: BoardIconProps): JSX.Element {
  const theme = useTheme();
  const fontSize = theme.typography.labelLarge.fontSize;

  if (baseBoard == "BB") {
    return <FreeBreakfastOutlined sx={{ fontSize }} />;
  }
  if (baseBoard == "HB") {
    return <RestaurantOutlined sx={{ fontSize }} />;
  }
  return <BedOutlined sx={{ fontSize }} />;
}
