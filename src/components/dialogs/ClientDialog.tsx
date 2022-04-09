import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";
import LoadingDataWrapper from "./LoadingDataWrapper";
import ClientDialogBody from "./ClientDialogBody";

import "./DescriptiveDialog.css";
import "./ClientDialog.css";

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

function ClientDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [clientData, setClientData] = useState<Api.ClientData>(initialData);

  const clientTitle = getTitleFromClientData(clientData);

  useFetchDataEffect(props, dispatch, setClientData);

  return (
    <div className="scrollable">
      <DialogHeader>Cliente {clientTitle}</DialogHeader>
      <LoadingDataWrapper isLoaded={clientData.id.length > 0}>
        <ClientDialogBody data={clientData} />
      </LoadingDataWrapper>
    </div>
  );
}

function getTitleFromClientData(data: Api.ClientData): string {
  return data === undefined ? "" : `${data.name} ${data.surname}`;
}

function useFetchDataEffect(
  props: Props,
  dispatch: Dispatch<AnyAction>,
  setClientData: Dispatch<SetStateAction<Api.ClientData>>
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
