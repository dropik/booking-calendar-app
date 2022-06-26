import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { css } from "@emotion/css";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import * as Utils from "../../utils";
import { useAppDispatch, useAppSelector, useColumns, useDates, useHotelData, useLeftmostDate } from "../../redux/hooks";
import { TileData, TileColor } from "../../redux/tilesSlice";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import M3IconButton from "../m3/M3IconButton";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchTiles from "../TableContainer/FetchTiles";
import { SurfaceTint } from "../m3/Tints";

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
          hotelData.floors.map((floor, floorIndex) => {
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
                  ...((floorIndex === 0) && {
                    borderTop: `1px solid ${theme.palette.outline.light}`
                  })
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
                              borderBottom: `1px solid ${theme.palette.onSurfaceVariant.dark}`,
                              height: "calc(5rem + 5px)",
                              ...((index === floor.rooms.length - 1) && {
                                borderBottom: 0,
                                height: "calc(5rem + 4px)"
                              })
                            }}>
                              {dates.map((date, dateIndex) => {
                                const dateObj = new Date(date);
                                const isWeekend = true;
                                return (
                                  <Grid key={date} item xs={1} sx={{
                                    ...(isWeekend && {
                                      borderRight: `1px solid ${theme.palette.onSurfaceVariant.dark}`,
                                    }),
                                    ...((dateIndex === dates.length - 1) && {
                                      borderRight: 0
                                    })
                                  }}></Grid>
                                );
                              })}
                            </Grid>
                            <Grid container spacing={0} columns={columns * 2} sx={{
                              position: "absolute",
                              top: 0
                            }}>
                              {
                                tiles[room.number].map((tile) => {
                                  const isFirst = index === 0;
                                  const isLast = index === floor.rooms.length - 1;
                                  if ("id" in tile) {
                                    return <Tile key={tile.id} data={tile} isFirst={isFirst} isLast={isLast} />;
                                  } else {
                                    return (
                                      <FreeSpace
                                        key={tile.from}
                                        from={tile.from}
                                        to={tile.to}
                                        cropLeft={tile.cropLeft}
                                        cropRight={tile.cropRight}
                                        isFirst={isFirst}
                                        isLast={isLast}
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

type FreeSpaceProps = {
  from: string,
  to: string,
  cropLeft: boolean,
  cropRight: boolean,
  isFirst?: boolean,
  isLast?: boolean
};

function FreeSpace({ from, to, cropLeft, cropRight, isFirst, isLast }: FreeSpaceProps): JSX.Element {
  const nights = Utils.daysBetweenDates(from, to);
  const size = 2 * nights - Number(cropLeft) - Number(cropRight);

  return (
    <Grid item xs={size} sx={{
      height: "5rem",
      // mt: "0.5rem",
      // mb: "0.5rem"
    }}>
    </Grid>
  );
}

type TileProps = {
  data: TileData,
  isFirst: boolean,
  isLast: boolean
}

function Tile({ data, isFirst, isLast }: TileProps): JSX.Element {
  const theme = useTheme();
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useAppSelector((state) => Utils.getDateShift(state.table.leftmostDate, state.table.columns - 1));
  const arrivalToRightmost = Utils.daysBetweenDates(data.from, rightmostDate);
  const leftmostToArrival = Utils.daysBetweenDates(leftmostDate, data.from);
  const assignedRoomType = useAppSelector((state) => {
    for (const floor of state.hotel.data.floors) {
      for (const room of floor.rooms) {
        if (room.number === data.roomNumber) {
          return room.type;
        }
      }
    }
  });
  const personsInAssignedRoomType = useAppSelector((state) => assignedRoomType ? state.roomTypes.data[assignedRoomType] : undefined);
  const titleRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const adjustLayoutRequestId = useAppSelector((state) => state.layout.adjustLayoutRequestId);
  const [title, setTitle] = useState(`${data.name} - ${data.persons} person${data.persons > 1 ? "e" : "a"}`);
  const significantEntity = data.entity.replace("Camera ", "").replace("camera ", "");
  const [body, setBody] = useState(significantEntity);

  useEffect(() => {
    if (titleRef.current && canvasRef.current) {
      const titleFontSize = getCanvasFontSize(titleRef.current);

      let text = `${data.name} - ${data.persons} person${data.persons > 1 ? "e" : "a"}`;
      let width = getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      const nameParts = data.name.split(" ");

      if (nameParts.length > 2) {
        let allCapitalized = true;
        let noneCapitalized = true;

        for (const namePart of nameParts) {
          const firstCharCode = namePart.charCodeAt(0);
          if ((firstCharCode >= 65) && (firstCharCode <= 90)) {
            noneCapitalized = false;
          } else {
            allCapitalized = false;
          }
        }

        if (allCapitalized || noneCapitalized) {
          nameParts.splice(2);
          let name = "";
          for (const namePart in nameParts) {
            name += `${namePart} `;
          }
          name.trimEnd();
          text = `${name} - ${data.persons} person${data.persons > 1 ? "e" : "a"}`;
          width = getTextWidth(canvasRef.current, text, titleFontSize);

          if (width <= titleRef.current.clientWidth) {
            setTitle(text);
            return;
          }
        }
      }

      let name = "";
      for (const namePart of nameParts) {
        name += `${namePart} `;
      }
      name.trimEnd();
      text = `${name} - ${data.persons}`;
      width = getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      let shortenedName = `${nameParts[0][0]}.`;
      for (let i = 1; i < nameParts.length; i++) {
        shortenedName += `${nameParts[i]} `;
      }
      shortenedName.trimEnd();
      text = `${shortenedName} - ${data.persons}`;
      width = getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      let initials = `${nameParts[0][0]}.`;
      const nameFirstCharCode = nameParts[0].charCodeAt(0);
      if ((nameFirstCharCode < 65) || (nameFirstCharCode > 90)) {
        initials += `${nameParts[1][0]}.`;
      } else {
        for (let i = 1; i < nameParts.length; i++) {
          const firstCharCode = nameParts[i].charCodeAt(0);
          if ((firstCharCode >= 65) && (firstCharCode <= 90)) {
            initials += `${nameParts[i][0]}.`;
          }
        }
      }
      text = `${initials} - ${data.persons}`;
      width = getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      setTitle(`${data.persons}`);
    }
  }, [adjustLayoutRequestId, leftmostDate, data.name, data.persons]);

  useEffect(() => {
    if (bodyRef.current && canvasRef.current) {
      const bodyFontSize = getCanvasFontSize(bodyRef.current);

      const width = getTextWidth(canvasRef.current, significantEntity, bodyFontSize);
      if (width <= bodyRef.current.clientWidth) {
        setBody(significantEntity);
        return;
      }

      const entityParts = significantEntity.split(" ");
      let entityAbbreviation = "";
      if (entityParts.length > 1) {
        for (const entityPart of entityParts) {
          entityAbbreviation += entityPart[0].toLocaleUpperCase();
        }
      } else {
        const consonants = ["b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
        entityAbbreviation = significantEntity[0];
        for (let i = 1; i < significantEntity.length; i++) {
          if (consonants.includes(significantEntity[i])) {
            entityAbbreviation += significantEntity[i];
            break;
          }
        }
      }
      setBody(entityAbbreviation);
    }
  }, [adjustLayoutRequestId, leftmostDate, significantEntity]);

  let badgeColor = undefined;
  if (personsInAssignedRoomType) {
    if (!personsInAssignedRoomType.includes(data.persons)) {
      badgeColor = theme.palette.error.light;
    } else if (assignedRoomType !== data.roomType) {
      badgeColor = theme.palette.warning.dark;
    }
  }

  let cropLeft = false;
  let cropRight = false;

  let size = data.nights * 2;
  if (leftmostToArrival < 0) {
    size -= -leftmostToArrival * 2 - 1;
    cropLeft = true;
  }
  if (arrivalToRightmost < data.nights) {
    size -= data.nights * 2 - arrivalToRightmost * 2 - 1;
    cropRight = true;
  }

  return (
    <Grid item xs={size} sx={{
      ...(!cropRight && {
        paddingRight: "0.25rem"
      }),
      ...(!cropLeft && {
        paddingLeft: "0.25rem"
      }),
      pt: "1px",
      pb: "1px"
    }}>
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
          ...(cropRight && {
            horizontal: "left"
          })
        }}
        badgeContent=" "
        variant="dot"
        sx={{
          display: "block",
          "& .MuiBadge-badge": {
            backgroundColor: badgeColor,
            top: "0.75rem",
            right: "0.75rem",
            ...(cropRight && {
              right: "auto",
              left: "0.75rem"
            })
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "3rem",
            p: "1rem",
            borderRadius: "0.75rem",
            ...(cropLeft && {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }),
            ...(cropRight && {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }),
            backgroundColor: theme.palette[`${data.color}Container`].light,
            color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light,
            border: `1px solid ${theme.palette.outline.light}`,
            ...(cropRight && {
              borderRight: 0
            }),
            ...(cropLeft && {
              borderLeft: 0
            })
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
            overflow: "hidden",
            "& > span": {
              width: "100%",
              whiteSpace: "nowrap"
            }
          }}>
            <canvas
              ref={canvasRef}
              className={css`
                position: fixed;
                top: -100000px
              `}
            />
            <Typography ref={titleRef} variant="titleMedium">{title}</Typography>
            <Typography ref={bodyRef} variant="bodySmall">{body}</Typography>
          </Box>
          {/* <SurfaceTint sx={{
            backgroundColor: theme.palette.primary.light,
            opacity: theme.opacities.surface1
          }} /> */}
        </Box>
      </Badge>
    </Grid>
  );
}

function getTextWidth(canvas: HTMLCanvasElement, text: string, font: string): number {
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  return 0;
}

function getCanvasFontSize(el: HTMLElement = document.body): string {
  const fontWeight = getCssStyle(el, "font-weight") || "normal";
  const fontSize = getCssStyle(el, "font-size") || "16px";
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

function getCssStyle(element: HTMLElement, prop: string): string {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}
