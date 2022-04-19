import React, { useCallback } from "react";

import * as Api from "../../api";

import DialogList from "./DialogList";
import ClientButtonRow from "./ClientButtonRow";

type Props = {
  name: string,
  surname: string
};

export default function ClientsList({ name, surname }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchClients(name, surname), [name, surname]);

  return (
    <DialogList tryFetchDataAsync={tryFetchDataAsync} dataPlaceholder="Nessun Cliente">
      {(item) => (
        <ClientButtonRow key={item.id} bookingId={item.bookingId} client={item} bookingName={item.bookingName} />
      )}
    </DialogList>
  );
}
