import React, { ReactNode } from "react";
import CheckIcon from "@mui/icons-material/Check";

import { ExportDialogState } from "./ExportDialogBody";

type Props = {
  children: ReactNode,
  state: ExportDialogState
};

export default function ExportDialogStateSwitch({ children, state }: Props): JSX.Element {
  switch (state) {
  case "fill":
    return <>{children}</>;
  case "loading":
    return <div className="message">Esporto...</div>;
  case "done":
    return <div className="message">Fatto <CheckIcon fontSize="small" /></div>;
  case "no data":
    return <div className="message">Nessun dato da esportare!</div>;
  }
}
