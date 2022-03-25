import React from "react";
import { hot } from "react-hot-loader";

import PoliceExportDialog from "./dialogs/PoliceExportDialog";

import "./Dialog.css";

function Dialog(): JSX.Element {
  return (
    <div className="dialog-container">
      <PoliceExportDialog />
    </div>
  );
}

export default hot(module)(Dialog);
