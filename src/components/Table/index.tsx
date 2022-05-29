import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";

import * as Utils from "../../utils";
import { TileData, TileColor } from "../../redux/tilesSlice";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import M3IconButton from "../m3/M3IconButton";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import { useAppDispatch, useAppSelector, useLeftmostDate } from "../../redux/hooks";

export default function Table(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(HotelSlice.fetchAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(RoomTypesSlice.fetchAsync());
  }, [dispatch]);

  return (
    <DrawerAdjacent>
      <Stack spacing={1} sx={{
        mt: "9.5rem",
        color: theme.palette.onSurface.light
      }}>
        <Box>
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
            <Typography variant="headlineMedium">Piano 1</Typography>
            <M3IconButton>
              <ExpandLessOutlined />
            </M3IconButton>
          </Box>
          <Stack spacing={0}>
            <Box sx={{
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
                <Typography variant="labelLarge">1</Typography>
                <Typography variant="bodySmall">tripla standard</Typography>
              </Box>
              <Box sx={{
                ml: "7.5rem",
                mt: "0.5rem",
                mb: "0.5rem"
              }}>
                <Grid container columnSpacing={1} rowSpacing={0} columns={7}>
                  <FreeSpace from="2022-05-26" to="2022-05-31" cropLeft={true} cropRight={false} />
                  <Tile data={{
                    id: "0",
                    bookingId: "0",
                    name: "Ivan Petrov",
                    from: "2022-05-31",
                    nights: 2,
                    roomType: "camera tripla",
                    entity: "camera tripla",
                    persons: 3,
                    color: "booking1",
                    roomNumber: 1
                  }}/>
                </Grid>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </DrawerAdjacent>
  );
}

type FreeSpaceProps = {
  from: string,
  to: string,
  cropLeft: boolean,
  cropRight: boolean
};

function FreeSpace({ from, to, cropLeft, cropRight }: FreeSpaceProps): JSX.Element {
  const theme = useTheme();

  const nights = Utils.daysBetweenDates(from, to);
  const size = nights + 0.5 * Number(cropLeft) + 0.5 * Number(cropRight);

  const cells: JSX.Element[] = [];

  let firstCellSize = 2;

  if (!cropLeft) {
    firstCellSize = 1;
  }

  cells.push(<Grid key={0} item xs={firstCellSize} sx={{ borderRight: `1px dashed ${theme.palette.outline.light}` }}></Grid>);
  for (let i = 1; i < nights; i++) {
    cells.push(<Grid key={i} item xs={2} sx={{ borderRight: `1px dashed ${theme.palette.outline.light}` }}></Grid>);
  }

  return (
    <Grid item xs={size}>
      <Box sx={{
        height: "calc(3rem - 2px)",
        borderRadius: "0.75rem",
        pt: "1rem",
        pb: "1rem",
        border: `1px dashed ${theme.palette.outline.light}`,
        ...(cropLeft && {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 0
        }),
        ...(cropRight && {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 0
        })
      }}>
        <Grid container spacing={0} columns={size * 2} sx={{ height: "100%" }}>
          {cells}
        </Grid>
      </Box>
    </Grid>
  );
}

type TileProps = {
  data: TileData
}

function Tile({ data }: TileProps): JSX.Element {
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

  let size = data.nights;
  if (leftmostToArrival < 0) {
    size -= -leftmostToArrival - 0.5;
    cropLeft = true;
  }
  if (arrivalToRightmost < data.nights) {
    size -= data.nights - arrivalToRightmost - 0.5;
    cropRight = true;
  }

  return (
    <Grid item xs={size}>
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
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
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
        }}>
          <Typography variant="titleMedium">{data.name} - {data.persons} person{data.persons > 1 ? "e": "a"}</Typography>
          <Typography variant="bodySmall">{data.entity.replace("Camera", "").replace("camera", "")}</Typography>
        </Box>
      </Badge>
    </Grid>
  );
}
