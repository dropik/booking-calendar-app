import React from "react";
import { useTheme, ThemePalettes } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import { useAppDispatch } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import M3Menu from "../m3/M3Menu";
import M3FilledButton from "../m3/M3FilledButton";

type Props = {
  tileId: string,
  onHide: () => void,
  anchorEl : HTMLElement | null
};

type BookingColors = "booking1" | "booking2" | "booking3" | "booking4" | "booking5" | "booking6" | "booking7" | "booking8";

const colors: BookingColors[] = ["booking1", "booking2", "booking3", "booking4", "booking5", "booking6", "booking7", "booking8"];

export default function ColorPicker({ tileId, onHide, anchorEl }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const open = Boolean(anchorEl);
  const id = open ? "color-picker" : undefined;

  function changeColor(color: BookingColors) {
    dispatch(TilesSlice.setColor({ tileId, color: theme.palette[`${color}Container` as ThemePalettes].main }));
    onHide();
  }

  return (
    <M3Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onHide}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <Grid container spacing={1} sx={{ pr: "0.5rem", pl: "0.5rem" }}>
        {colors.map((color, index) => (
          <Grid key={index} item xs={3}>
            <M3FilledButton sx={{ ml: "calc(50% - 1.25rem)" }} container iconOnly color={color} onClick={() => changeColor(color)}></M3FilledButton>
          </Grid>
        ))}
      </Grid>
    </M3Menu>
  );
}
