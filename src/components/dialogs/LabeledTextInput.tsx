import React, { useContext } from "react";
import { hot } from "react-hot-loader";

import { FindBookingDialogContext } from "./FindBookingDialogBody";

type Props = {
  id: string,
  name: string,
  value: string,
  onChange: (newValue: string) => void
};

function LabeledTextInput({ id, name, value, onChange }: Props): JSX.Element {
  const { enableLiveUpdate } = useContext(FindBookingDialogContext);

  return (
    <div>
      <label htmlFor={id} className="label">{name}:</label>
      <input type={"text"} id={id} value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
        enableLiveUpdate();
      }} />
    </div>
  );
}

export default hot(module)(LabeledTextInput);
