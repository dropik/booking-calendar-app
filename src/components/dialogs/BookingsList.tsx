import React, { memo, useCallback } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import BookingButtonRow from "./BookingButtonRow";
import DialogList from "./DialogList";

type Props = {
  nameOrId: string,
  from: string,
  to: string
};

function BookingsList({ nameOrId, from, to }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchBookings(nameOrId, from, to), [nameOrId, from, to]);

  return (
    <DialogList tryFetchDataAsync={tryFetchDataAsync} dataPlaceholder="Nessuna Prenotazione">
      {(item) => (
        <BookingButtonRow key={item.id} data={item} />
      )}
    </DialogList>
  );
}

export default memo(hot(module)(BookingsList));
