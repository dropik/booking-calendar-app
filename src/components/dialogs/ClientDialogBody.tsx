import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import ClientDialogBodyData from "./ClientDialogBodyData";

import "./DescriptiveDialog.css";

type Props = {
  data?: Api.ClientData
};

function BookingDialogBody(props: Props): JSX.Element {
  if (!props.data) {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  }

  return <ClientDialogBodyData data={props.data} />;
}

export default hot(module)(BookingDialogBody);
