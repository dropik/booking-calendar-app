import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import ClientDialogBody from "./ClientDialogBody";

import "./DescriptiveDialog.css";
import "./ClientDialog.css";
import DataDialog from "./DataDialog";

type Props = {
  bookingId: string,
  clientId: string
};

const initialData: Api.ClientData = {
  id: "",
  name: "",
  surname: "",
  dateOfBirth: "",
  stateOfBirth: "",
  placeOfBirth: "",
  documentNumber: "",
  documentType: "passport",
  booking: {
    id: "",
    name: "",
    from: "",
    to: ""
  }
};

function ClientDialog({ bookingId, clientId }: Props): JSX.Element {
  const [clientData, setClientData] = useState<Api.ClientData>(initialData);
  const tryFetchDataAsync = useTryFetchDataAsyncCallback(bookingId, clientId, setClientData);

  const clientTitle = getTitleFromClientData(clientData);

  return (
    <DataDialog
      header={`Cliente ${clientTitle}`}
      data={clientData}
      onTryFetchDataAsync={tryFetchDataAsync}
    >
      <ClientDialogBody data={clientData} />
    </DataDialog>
  );
}

function useTryFetchDataAsyncCallback(
  bookingId: string,
  clientId: string,
  setClientData: Dispatch<SetStateAction<Api.ClientData>>
): () => Promise<void> {
  return useCallback<() => Promise<void>>(async () => {
    const response = await Api.fetchClient(bookingId, clientId);
    setClientData(response.data);
  }, [bookingId, clientId, setClientData]);
}

function getTitleFromClientData(data: Api.ClientData): string {
  return data === undefined ? "" : `${data.name} ${data.surname}`;
}

export default hot(module)(ClientDialog);
