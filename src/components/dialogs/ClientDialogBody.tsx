import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import ClientDialogBodyData from "./ClientDialogBodyData";

import "./DescriptiveDialog.css";

type Props = {
  data?: Api.ClientData,
  dialogState: "idle" | "loading"
};

function BookingDialogBody(props: Props): JSX.Element {
  if (props.dialogState === "loading") {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  } else if (props.data) {
    return <ClientDialogBodyData data={props.data} />;
  }

  return <></>;
}

export default hot(module)(BookingDialogBody);
