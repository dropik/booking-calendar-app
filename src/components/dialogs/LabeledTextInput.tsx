import React from "react";
import { hot } from "react-hot-loader";

import LiveUpdateInput from "./LiveUpdateInput";

type Props = {
  id: string,
  name: string,
  value: string,
  onChange: (newValue: string) => void
};

function LabeledTextInput({ id, name, value, onChange }: Props): JSX.Element {

  return (
    <LiveUpdateInput>
      <div>
        <label htmlFor={id} className="label">{name}:</label>
        <input type={"text"} id={id} value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.value);
        }} />
      </div>
    </LiveUpdateInput>
  );
}

export default hot(module)(LabeledTextInput);
