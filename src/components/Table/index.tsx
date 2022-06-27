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
import DataRow from "./DataRow";
import GridRow from "./GridRow";

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
                      const significantRoomType = room.type.replace("Camera ", "").replace("camera ", "");

                      return (
                        <Box key={room.number} sx={{
                          position: "relative"
                        }}>
                          <Box sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "5.5rem",
                            pr: "1rem",
                            pl: "1rem",
                            borderRight: `1px solid ${theme.palette.outline.light}`
                          }}>
                            <Typography variant="labelLarge">{room.number}</Typography>
                            <Typography
                              sx={{
                                textAlign: "center",
                                overflowWrap: "anywhere"
                              }}
                              variant="bodySmall"
                            >
                              {significantRoomType}
                            </Typography>
                          </Box>
                          <Box sx={{
                            position: "relative",
                            ml: "calc(7.5rem + 1px)",
                          }}>
                            <GridRow isLast={index === floor.rooms.length - 1} />
                            <DataRow roomNumber={room.number} />
                          </Box>
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
