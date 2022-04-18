import React from "react";

import * as Api from "../../api";

type Props = {
  data: Api.BookingShortData
};

export default function BookingRowContent({ data }: Props): JSX.Element {
  return (
    <>
      <div className="id">#{data.id}</div>
      <div className="name">{data.name}</div>
      <div className="from">{new Date(data.from).toLocaleDateString()}</div>
      <div className="to">{new Date(data.to).toLocaleDateString()}</div>
    </>
  );
}
