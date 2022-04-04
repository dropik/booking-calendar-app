import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import BookingDialogBodyData from "./BookingDialogBodyData";

import "./DescriptiveDialog.css";

type Props = {
  data: Api.BookingData | undefined,
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
    return <BookingDialogBodyData data={props.data} />;
  }

  return <></>;
}

export default hot(module)(BookingDialogBody);
