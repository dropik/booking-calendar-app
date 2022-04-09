import React from "react";
import { hot } from "react-hot-loader";

type Props = {
  name: string,
  value: string
};

function DescriptionRow(props: Props): JSX.Element {
  return (
    <div className="row">
      <div className="field-label">{props.name}:</div>
      <div><b>{props.value}</b></div>
    </div>
  );
}

export default hot(module)(DescriptionRow);
