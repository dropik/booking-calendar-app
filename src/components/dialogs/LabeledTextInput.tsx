import React from "react";

import LiveUpdateInput from "./LiveUpdateInput";

type Props = {
  id: string,
  label: string,
  isValid?: boolean,
  value: string,
  onChange: (newValue: string) => void
};

export default function LabeledTextInput({ id, label, isValid, value, onChange }: Props): JSX.Element {

  return (
    <LiveUpdateInput value={value}>
      <div>
        <label htmlFor={id} className="label">{label}:</label>
        <input
          type={"text"}
          id={id}
          className={(isValid === undefined) || isValid ? "" : "invalid" }
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value) }
        />
      </div>
    </LiveUpdateInput>
  );
}
