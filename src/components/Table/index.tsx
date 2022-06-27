import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import { useAppDispatch, useHotelData } from "../../redux/hooks";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import M3IconButton from "../m3/M3IconButton";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchTiles from "../TableContainer/FetchTiles";
import RowBody from "./RowBody";
import RowHeader from "./RoomHeader";

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
          hotelData.floors.map((floor) => {
            const floorNameParts = floor.name.split(" ");
            let capitalizedFloor = "";
            for (const part of floorNameParts) {
              capitalizedFloor += `${part[0].toLocaleUpperCase()}${part.substring(1)} `;
            }
            capitalizedFloor.trimEnd();

            return (
              <Box key={floor.name}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pl: "2rem",
                  pr: "2rem",
                  pt: "1rem",
                  pb: "1rem",
                  borderBottom: `1px solid ${theme.palette.outline.light}`
                }}>
                  <Typography variant="headlineMedium">{capitalizedFloor}</Typography>
                  <M3IconButton>
                    <ExpandLessOutlinedIcon />
                  </M3IconButton>
                </Box>
                <Stack spacing={0} sx={{
                  borderBottom: `1px solid ${theme.palette.outline.light}`
                }}>
                  {
                    floor.rooms.map((room, index) => {

                      return (
                        <Box key={room.number} sx={{
                          position: "relative"
                        }}>
                          <RowHeader room={room} />
                          <RowBody isLast={index === floor.rooms.length - 1} roomNumber={room.number} />
                        </Box>
                      );
                    })
                  }
                </Stack>
              </Box>
            );
          })
        }
      </Stack>
    </DrawerAdjacent>
  );
}
