import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import * as Utils from "../../utils";
import { useAppDispatch, useAppSelector, useColumns, useDates, useHotelData, useLeftmostDate } from "../../redux/hooks";
import { TileData } from "../../redux/tilesSlice";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import M3IconButton from "../m3/M3IconButton";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchTiles from "../TableContainer/FetchTiles";
import Tile from "./Tile";
import FreeSpace, { FreeSpaceProps } from "./FreeSpace";

type TileDescriptor = FreeSpaceProps | TileData;

export default function Table(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const leftmostDate = useLeftmostDate();
  const oneDayBefore = Utils.getDateShift(leftmostDate, -1);
  const columns = useColumns();
  const dates = useDates();

  const tiles = useAppSelector((state) => {
    const tiles: TileDescriptor[][] = [];

    for (const floor of hotelData.floors) {
      for (const room of floor.rooms) {
        tiles[room.number] = [];
        const assignedTilesForRoom = state.tiles.assignedMap[room.number];

        if (!assignedTilesForRoom) {
          tiles[room.number].push({
            from: oneDayBefore,
            to: Utils.getDateShift(leftmostDate, columns),
            cropLeft: true,
            cropRight: true
          });
          continue;
        }

        const dateCounterObj = new Date(oneDayBefore);
        let freeSpace: FreeSpaceProps | null = null;

        for (let i = 0; i < columns + 1; i++) {
          const dateCounter = Utils.dateToString(dateCounterObj);
          const assignedTile = assignedTilesForRoom[dateCounter];

          if (!freeSpace) {
            if (assignedTile) {
              const tile = state.tiles.data[assignedTile];
              tiles[room.number].push(tile);
              i += tile.nights;
              dateCounterObj.setDate(dateCounterObj.getDate() + tile.nights + 1);
            } else {
              freeSpace = {
                from: dateCounter,
                to: dateCounter,
                cropLeft: false,
                cropRight: false
              };
              if (i === 0) {
                freeSpace.cropLeft = true;
              }
              dateCounterObj.setDate(dateCounterObj.getDate() + 1);
            }
          } else {
            if (assignedTile) {
              freeSpace.to = dateCounter;
              tiles[room.number].push(freeSpace);
              freeSpace = null;

              const tile = state.tiles.data[assignedTile];
              tiles[room.number].push(tile);
              i += tile.nights - 1;
              dateCounterObj.setDate(dateCounterObj.getDate() + tile.nights);
            } else {
              freeSpace.to = dateCounter;
              dateCounterObj.setDate(dateCounterObj.getDate() + 1);
            }
          }
        }

        if (freeSpace) {
          freeSpace.cropRight = true;
          tiles[room.number].push(freeSpace);
        }
      }
    }

    return tiles;
  });

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
                            <Grid container spacing={0} columns={columns * 2} sx={{
                              position: "absolute",
                              top: 0
                            }}>
                              {
                                tiles[room.number].map((tile) => {
                                  if ("id" in tile) {
                                    return <Tile key={tile.id} data={tile} />;
                                  } else {
                                    return (
                                      <FreeSpace
                                        key={tile.from}
                                        from={tile.from}
                                        to={tile.to}
                                        cropLeft={tile.cropLeft}
                                        cropRight={tile.cropRight}
                                      />
                                    );
                                  }
                                })
                              }
                            </Grid>
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
