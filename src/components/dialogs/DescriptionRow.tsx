import React from "react";

type Props = {
  name: string,
  value: string
};

export default function DescriptionRow({ name, value }: Props): JSX.Element {
  return (
    <div className="row">
      <div className="field-label">{name}:</div>
      <div><b>{value}</b></div>
    </div>
  );
}
