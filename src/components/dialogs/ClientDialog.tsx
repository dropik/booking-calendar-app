import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";
import ClientDialogBody from "./ClientDialogBody";

import "./ClientDialog.css";

type DialogState = "idle" | "loading";

type Props = {
  bookingId: string,
  clientId: string,
  showGoBackButton?: boolean,
  fadeOutDialog: () => void
};

function ClientDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [dialogState, setDialogState] = useState<DialogState>("idle");
  const [clientData, setClientData] = useState<Api.ClientData>();

  const clientTitle = clientData === undefined ? "" : `${clientData.name} ${clientData.surname}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.fetchClient(props.bookingId, props.clientId);
        setClientData(response.data);
      } catch (Error) {
        dispatch(ConnectionErrorSlice.show());
      } finally {
        setDialogState("idle");
      }
    }
    fetchData();
    setDialogState("loading");
  }, [dispatch, props.bookingId, props.clientId]);

  return (
    <>
      <DialogHeader title={`Cliente ${clientTitle}`} showGoBackButton={props.showGoBackButton} fadeOutDialog={props.fadeOutDialog} />
      <ClientDialogBody data={clientData} dialogState={dialogState} />
    </>
  );
}

export default hot(module)(ClientDialog);
