import React, { memo, useMemo } from "react";

import { Booking, ClientData, Tile } from "../../api";
import { TileColor, TileData } from "../../redux/tilesSlice";

import ExpandableTile from "../ExpandableTile";
import { TileContext } from "../Tile/context";
import { BookingDetailsContext } from "./context";

export type StayDetailsProps = {
  booking: Booking<ClientData[]>,
  tile: Tile<ClientData[]>,
  isFirst: boolean
}

export default memo(function StayDetails(props: StayDetailsProps): JSX.Element {
  const { booking, tile, isFirst } = props;


  const el = useMemo(() => {
    const tileData: TileData = {
      id: tile.id,
      bookingId: booking.id,
      name: booking.name,
      from: tile.from,
      nights: tile.nights,
      roomType: tile.roomType,
      entity: tile.entity,
      persons: tile.persons.length,
      color: booking.color ?? `booking${Math.floor(Math.random() * 7) + 1}` as TileColor,
      roomId: tile.roomId
    };

    return (
      <BookingDetailsContext.Provider value={{ clients: tile.persons }}>
        <TileContext.Provider value={{ data: tileData, cropRight: false, cropLeft: false }}>
          <ExpandableTile variant="in-content" isFirst={isFirst} />
        </TileContext.Provider>
      </BookingDetailsContext.Provider>
    );
  }, [tile, booking, isFirst]);
  return el;
});
