import React, { useCallback, useLayoutEffect } from "react";
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
      <CirclePicker colors={["#fccfcf", "#fce7cf", "#fafccf", "#d6fccf", "#cffcfc", "#cfe7fc", "#d2cffc", "#f5cffc"]} width="168px" onChange={(color) => {
        dispatch(TilesSlice.setColor({ tileId, color: color.hex }));
        hidePicker();
      }} />
    </div>
  );
}
