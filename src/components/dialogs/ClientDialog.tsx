import React, { useCallback } from "react";

import * as Api from "../../api";

import DataDialog from "./DataDialog";
import ClientDialogBody from "./ClientDialogBody";

import "./ClientDialog.css";

type Props = {
  bookingId: string,
  clientId: string
};

export default function ClientDialog({ bookingId, clientId }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchClient(bookingId, clientId), [bookingId, clientId]);

  return (
    <DataDialog
      header={(data) => `Cliente ${getTitleFromClientData(data)}`}
      tryFetchDataAsync={tryFetchDataAsync}
    >
      {(data) => <ClientDialogBody data={data} />}
    </DataDialog>
  );
}

function getTitleFromClientData(data: Api.ClientData | undefined): string {
  return data === undefined ? "" : `${data.name} ${data.surname}`;
}
