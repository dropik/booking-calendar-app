import React from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";

import PoliceExportDialog from "./dialogs/PoliceExportDialog";

import "./Dialog.css";

function Dialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedDialog = useAppSelector((state) => state.dialog.selectedDialog);

  function hideDialog() {
    dispatch(DialogSlice.hide());
  }

  if (!selectedDialog) {
    return <></>;
  }

  return (
    <div className="dialog-container" onClick={hideDialog}>
      <PoliceExportDialog />
    </div>
  );
}

export default hot(module)(Dialog);
