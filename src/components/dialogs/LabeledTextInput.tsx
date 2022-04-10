import React from "react";
import { hot } from "react-hot-loader";

type Props = {
  id: string,
  name: string,
  value: string,
  setValue: (newValue: string) => void,
  enableLiveUpdate: () => void
};

function LabeledTextInput({ id, name, value, setValue, enableLiveUpdate }: Props): JSX.Element {
  return (
    <div>
      <label htmlFor={id} className="label">{name}:</label>
      <input type={"text"} id={id} value={value} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        enableLiveUpdate();
      }} />
    </div>
  );
}

export default hot(module)(LabeledTextInput);
