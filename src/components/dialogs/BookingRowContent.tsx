import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

type Props = {
  data: Api.BookingShortData
};

function BookingRowContent({ data }: Props): JSX.Element {
  return (
    <>
      <div className="id">#{data.id}</div>
      <div className="name">{data.name}</div>
      <div className="from">{new Date(data.from).toLocaleDateString()}</div>
      <div className="to">{new Date(data.to).toLocaleDateString()}</div>
    </>
  );
}

export default hot(module)(BookingRowContent);
