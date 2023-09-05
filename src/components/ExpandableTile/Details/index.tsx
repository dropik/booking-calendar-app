import React, { useContext } from "react";
import Stack from "@mui/material/Stack";

import { api } from "../../../api";
import { TileContext } from "../../Tile/context";
import { BookingDetailsContext } from "../../BookingDetails/context";
import ExpandableTileContext from "../context";

import DetailsCollapse from "./DetailsCollapse";
import Error from "./Error";
import Clients from "./Clients";
import ShowBookingButton from "./ShowBookingButton";
import M3Skeleton from "../../m3/M3Skeleton";

type DetailsProps = {
  open: boolean,
};

export default function Details({ open }: DetailsProps): JSX.Element {
  const { data } = useContext(TileContext);
  const { clients: clientsInBooking } = useContext(BookingDetailsContext);
  const { variant } = useContext(ExpandableTileContext);
  const { data: loadedClients, isLoading: isClientsLoading } = api.endpoints.getClientsByTile.useQuery(
    { bookingId: data?.bookingId ?? "", tileId: data?.id ?? "" },
    { skip: !open || !data || clientsInBooking.length > 0 },
  );
  const clients = loadedClients ?? clientsInBooking;

  return (
    <DetailsCollapse open={open}>
      <Stack spacing={1} sx={{ p: "1rem", pt: variant === "in-content" ? 0 : undefined }}>
        <Error />
        {data ? (
          <Clients clients={clients} isLoading={isClientsLoading} />
        ) : <M3Skeleton variant="rounded" height="7rem" width="15rem" />}
        <ShowBookingButton show={clients.length > 0} />
      </Stack>
    </DetailsCollapse>
  );
}
