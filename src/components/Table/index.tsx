import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useHotelData } from "../../redux/hooks";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchTiles from "../TableContainer/FetchTiles";
import Floor from "./Floor";

export default function Table(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();

  useEffect(() => {
    dispatch(HotelSlice.fetchAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(RoomTypesSlice.fetchAsync());
  }, [dispatch]);

  return (
    <DrawerAdjacent>
      <FetchTiles />
      <Stack spacing={0} sx={{
        mt: "9.5rem",
        color: theme.palette.onSurface.light
      }}>
        {
          hotelData.floors.map((floor) => (
            <Floor key={floor.name} data={floor} />
          ))
        }
      </Stack>
    </DrawerAdjacent>
  );
}
