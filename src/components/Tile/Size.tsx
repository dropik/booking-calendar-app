import React, { ReactNode, useContext } from "react";
import Grid, { GridProps } from "@mui/material/Grid";

import { Utils } from "../../utils";
import { useAppSelector, useLeftmostDate } from "../../redux/hooks";
import { TileContext } from "./context";
import { TileData } from "../../redux/tilesSlice";

type SizeProps = {
  children: ReactNode
} & GridProps;

export default function Size({ children, sx }: SizeProps): JSX.Element {
  const data = useContext(TileContext).data;
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useAppSelector((state) => Utils.getDateShift(state.table.leftmostDate, state.table.columns - 1));
  const { size, cropLeft, cropRight } = getSize(leftmostDate, rightmostDate, data);

  return (
    <Grid
      item
      xs={size}
      sx={{
        ...(!cropRight && {
          pr: "0.25rem"
        }),
        ...(!cropLeft && {
          pl: "0.25rem"
        }),
        pt: "0.25rem",
        pb: "0.25rem",
        ...sx
      }}
    >
      <TileContext.Provider value={{ data: data, cropLeft: cropLeft, cropRight: cropRight }}>
        {children}
      </TileContext.Provider>
    </Grid>
  );
}

function getSize(leftmostDate: string, rightmostDate: string, data?: TileData): { size: number, cropLeft: boolean, cropRight: boolean } {
  if (!data) {
    return { size: 1, cropLeft: false, cropRight: false };
  }

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

  return { size, cropLeft, cropRight };
}
