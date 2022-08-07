import React, { ReactNode, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";

import * as Utils from "../../../../../../../../utils";
import { useAppDispatch, useAppSelector, useLeftmostDate } from "../../../../../../../../redux/hooks";
import { TileContext } from "./context";
import { grab, drop } from "../../../../../../../../redux/tilesSlice";

type Props = {
  children: ReactNode
}

export default function TileSize({ children }: Props): JSX.Element {
  const data = useContext(TileContext).data;
  const dispatch = useAppDispatch();
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useAppSelector((state) => Utils.getDateShift(state.table.leftmostDate, state.table.columns - 1));
  const leftmostToArrival = Utils.daysBetweenDates(leftmostDate, data.from);
  const arrivalToRightmost = Utils.daysBetweenDates(data.from, rightmostDate);

  let cropLeft = false;
  let cropRight = false;

  let size = data.nights;
  if (leftmostToArrival < 0) {
    size -= -leftmostToArrival - 0.5;
    cropLeft = true;
  }
  if (arrivalToRightmost < data.nights) {
    size -= data.nights - arrivalToRightmost - 0.5;
    cropRight = true;
  }

  useEffect(() => {
    return () => {
      dispatch(drop({ tileId: data.id }));
    };
  }, [dispatch, data.id]);

  return (
    <Grid
      draggable
      item
      xs={size}
      onDragStart={() => {
        dispatch(grab({ tileId: data.id, mouseY: 0 }));
      }}
      onDragEnd={() => {
        dispatch(drop({ tileId: data.id }));
      }}
      sx={{
        ...(!cropRight && {
          paddingRight: "1.5px"
        }),
        ...(!cropLeft && {
          paddingLeft: "1.5px"
        }),
        pt: "1px",
        pb: "1px"
      }}
    >
      <TileContext.Provider value={{ data: data, cropLeft: cropLeft, cropRight: cropRight }}>
        {children}
      </TileContext.Provider>
    </Grid>
  );
}
