import React from "react";

import M3AppBar from "./m3/M3AppBar";
import DateInput from "./header/DateInput";

export default function Header(): JSX.Element {
  return (
    <M3AppBar>
      <DateInput />
    </M3AppBar>
  );
}
