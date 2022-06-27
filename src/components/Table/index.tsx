import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import { useAppDispatch, useDates, useHotelData } from "../../redux/hooks";
import { TileData } from "../../redux/tilesSlice";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import M3IconButton from "../m3/M3IconButton";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchTiles from "../TableContainer/FetchTiles";
import { FreeSpaceProps } from "./FreeSpace";
import DataRow from "./DataRow";

export type TileDescriptor = FreeSpaceProps | TileData;

export default function Table(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const dates = useDates();

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
                            <Grid container spacing={0} columns={7} sx={{
                              borderBottom: `1px solid ${theme.palette.surfaceVariant.light}`,
                              height: "calc(5rem + 5px)",
                              ...((index === floor.rooms.length - 1) && {
                                borderBottom: 0,
                                height: "calc(5rem + 4px)"
                              })
                            }}>
                              {dates.map((date, dateIndex) => (
                                <Grid key={date} item xs={1} sx={{
                                  borderRight: `1px solid ${theme.palette.surfaceVariant.light}`,
                                  ...((dateIndex === dates.length - 1) && {
                                    borderRight: 0
                                  })
                                }}></Grid>
                              ))}
                            </Grid>
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
