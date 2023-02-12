import React, { useState } from "react";
import M3Chip from "../m3/M3Chip";
import M3Dialog from "../m3/M3Dialog";

export default function IstatTools(): JSX.Element {
  const [selected, setSelected] = useState(false);

  function open(): void {
    setSelected(true);
  }

  function close(): void {
    setSelected(false);
  }

  return (
    <>
      <M3Chip selected={selected} onClick={open} label="ISTAT" />
      <M3Dialog open={selected} onClose={close} heightRem={10}>

      </M3Dialog>
    </>
  );
}
