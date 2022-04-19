import React, { useCallback } from "react";

import * as Api from "../../api";

import BookingButtonRow from "./BookingButtonRow";
import DialogList from "./DialogList";

type Props = {
  nameOrId: string,
  from: string,
  to: string
};

export default function BookingsList({ nameOrId, from, to }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchBookings(nameOrId, from, to), [nameOrId, from, to]);

  return (
    <DialogList tryFetchDataAsync={tryFetchDataAsync} dataPlaceholder="Nessuna Prenotazione">
      {(item) => (
        <BookingButtonRow key={item.id} data={item} />
      )}
    </DialogList>
  );
}
