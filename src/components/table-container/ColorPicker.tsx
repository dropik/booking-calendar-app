import React, { useCallback, useLayoutEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { CirclePicker } from "react-color";

import { useAppDispatch } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as PoppersSlice from "../../redux/poppersSlice";

import "./ColorPicker.css";

type Props = {
  tileId: string,
  onHide: () => void
};

export default function ColorPicker({ tileId, onHide }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const hidePicker = useCallback(() => {
    onHide();
    dispatch(PoppersSlice.hide());
  }, [dispatch, onHide]);

  function stopPropagation(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  useLayoutEffect(() => {
    window.addEventListener("mouseup", hidePicker);
    return () => window.removeEventListener("mouseup", hidePicker);
  }, [hidePicker]);

  return (
    <div className="color-picker" onMouseDown={stopPropagation} onMouseUp={stopPropagation}>
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
        hidePicker();
      }} />
    </div>
  );
}
