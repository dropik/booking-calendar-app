import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";
import ClientDialogBody from "./ClientDialogBody";

import "./ClientDialog.css";

type Props = {
  bookingId: string,
  clientId: string
};

function ClientDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [clientData, setClientData] = useState<Api.ClientData>();

  const clientTitle = getTitleFromClientData(clientData);

  useFetchDataEffect(props, dispatch, setClientData);

  return (
    <div className="scrollable">
      <DialogHeader>Cliente {clientTitle}</DialogHeader>
      <ClientDialogBody data={clientData} />
    </div>
  );
}

function getTitleFromClientData(data: Api.ClientData | undefined): string {
  return data === undefined ? "" : `${data.name} ${data.surname}`;
}

function useFetchDataEffect(
  props: Props,
  dispatch: Dispatch<AnyAction>,
  setClientData: Dispatch<SetStateAction<Api.ClientData | undefined>>
): void {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.fetchClient(props.bookingId, props.clientId);
        setClientData(response.data);
      } catch (Error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }
    fetchData();
  }, [props, dispatch, setClientData]);
}

export default hot(module)(ClientDialog);
