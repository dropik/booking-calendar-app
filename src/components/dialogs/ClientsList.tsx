import React, { memo, useCallback } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DialogList from "./DialogList";
import ClientButtonRow from "./ClientButtonRow";

type Props = {
  name: string,
  surname: string
};

function ClientsList({ name, surname }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchClients(name, surname), [name, surname]);

  return (
    <DialogList tryFetchDataAsync={tryFetchDataAsync} dataPlaceholder="Nessun Cliente">
      {(item) => (
        <ClientButtonRow key={item.id} bookingId={item.bookingId} client={item} bookingName={item.bookingName} />
      )}
    </DialogList>
  );
}

export default memo(hot(module)(ClientsList));
