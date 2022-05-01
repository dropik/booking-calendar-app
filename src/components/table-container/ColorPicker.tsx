import React from "react";
import { useTheme } from "@mui/material/styles";
import { CirclePicker } from "react-color";

import { useAppDispatch } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import "./ColorPicker.css";
import M3Menu from "../m3/M3Menu";

type Props = {
  tileId: string,
  onHide: () => void,
  anchorEl : HTMLElement | null
};

export default function ColorPicker({ tileId, onHide, anchorEl }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const open = Boolean(anchorEl);
  const id = open ? "color-picker" : undefined;

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
      PaperProps={{
        sx: {
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem"
        }
      }}
    >
      <CirclePicker colors={[
        theme.palette.booking1Container.main,
        theme.palette.booking2Container.main,
        theme.palette.booking3Container.main,
        theme.palette.booking4Container.main,
        theme.palette.booking5Container.main,
        theme.palette.booking6Container.main,
        theme.palette.booking7Container.main,
        theme.palette.booking8Container.main,
      ]} width="168px" onChange={(color) => {
        dispatch(TilesSlice.setColor({ tileId, color: color.hex }));
        onHide();
      }} />
    </M3Menu>
  );
}
