import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import BookingDialogBodyData from "./BookingDialogBodyData";

import "./DescriptiveDialog.css";

type Props = {
  data?: Api.BookingData
};

function BookingDialogBody(props: Props): JSX.Element {
  if (!props.data) {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  }

  return <BookingDialogBodyData data={props.data} />;
}

export default hot(module)(BookingDialogBody);
