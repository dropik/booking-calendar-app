import React from "react";

import { useParams } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { api } from "../../api";

import { TileContext } from "../Tile/context";
import ExpandableTile from "../ExpandableTile";
import M3Skeleton from "../m3/M3Skeleton";
import StayDetails from "./StayDetails";
import { Utils } from "../../utils";

export default function BookingDetails(): JSX.Element {
  const theme = useTheme();
  const { from, bookingId } = useParams();
  const { data: booking, isSuccess: isLoaded, isFetching } = api.endpoints.getBooking.useQuery({ bookingId: bookingId ?? "", from: from ?? "" });
  const skeletonRooms = [0, 1];

  const periodStr = (isLoaded && !isFetching) ?
    `${(new Date(booking.from)).toLocaleDateString("it")} - ${(new Date(booking.to)).toLocaleDateString("it")}` :
    undefined;

  return (
    <Stack
      sx={{
        position: "relative",
        flexGrow: 1,
        borderBottomRightRadius: "0.75rem",
        borderBottomLeftRadius: "0.75rem",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%"
      }}>
        <Stack spacing={0} sx={{
          position: "sticky",
          boxSizing: "border-box",
          flexGrow: 1,
          height: "4rem",
          maxWidth: "40rem",
          backgroundColor: theme.palette.secondaryContainer.light,
          color: theme.palette.onSecondaryContainer.light,
          borderTopRightRadius: "0.75rem",
          borderTopLeftRadius: "0.75rem",
          justifyContent: "center",
          pr: "1rem",
          pl: "1rem"
        }}>
          <Typography variant="titleMedium">{(isLoaded && !isFetching) ? Utils.evaluateEntitiesInString(booking.name) : <M3Skeleton width="6rem" />}</Typography>
          <Typography variant="bodySmall">{periodStr ? periodStr : <M3Skeleton width="10rem" />}</Typography>
        </Stack>
      </Box>
      <Stack spacing={1} sx={{
        maxHeight: "calc(100vh - 8rem)",
        maxWidth: "40rem",
        ...{ overflowY: "auto" },
        ...{ overflowY: "overlay" },
        boxSizing: "border-box",
        pb: "1rem"
      }}>
        {(isLoaded && !isFetching)
          ? booking.tiles.map((tile, index) => <StayDetails key={tile.id} tile={tile} booking={booking} isFirst={index === 0} />)
          : skeletonRooms.map((room) => (
            <TileContext.Provider key={room} value={{ cropRight: false, cropLeft: false }}>
              <ExpandableTile variant="in-content" isFirst={room === 0} />
            </TileContext.Provider>
          ))}
      </Stack>
    </Stack>
  );
}
