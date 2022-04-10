import React from "react";
import { hot } from "react-hot-loader";

type Props = {
  name: string,
  value: string
};

function DescriptionRow({ name, value }: Props): JSX.Element {
  return (
    <div className="row">
      <div className="field-label">{name}:</div>
      <div><b>{value}</b></div>
    </div>
  );
}

export default hot(module)(DescriptionRow);
