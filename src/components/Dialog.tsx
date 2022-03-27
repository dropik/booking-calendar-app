import React, { useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";

import DialogHeader from "./dialogs/DialogHeader";
import ExportDialogBody from "./dialogs/ExportDialogBody";
import TaxDialogBody from "./dialogs/TaxDialogBody";

import "./Dialog.css";

function Dialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedDialog = useAppSelector((state) => state.dialog.selectedDialog);
  const dialogRef = useRef<HTMLDivElement>(null);

  function hideDialog() {
    dispatch(DialogSlice.hide());
  }

  function handleDialogAnimationEnd() {
    if (dialogRef.current) {
      const classList = dialogRef.current.classList;
      if (classList.contains("show")) {
        classList.remove("show");
      } else if (classList.contains("hide")) {
        hideDialog();
      }
    }
  }

  function fadeOutDialog() {
    if (dialogRef.current) {
      dialogRef.current.classList.add("hide");
    }
  }

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  if (!selectedDialog) {
    return <></>;
  }

  let dialogBody: JSX.Element;
  if (selectedDialog === "cityTax") {
    dialogBody = <TaxDialogBody fadeOutDialog={fadeOutDialog} />;
  } else {
    dialogBody = <ExportDialogBody type={selectedDialog} fadeOutDialog={fadeOutDialog} />;
  }

  return (
    <div className="dialog-container" onClick={fadeOutDialog}>
      <div
        ref={dialogRef}
        className="dialog show"
        onClick={preventHideOnSelfClick}
        onAnimationEnd={handleDialogAnimationEnd}
      >
        <DialogHeader type={selectedDialog} fadeOutDialog={fadeOutDialog} />
        {dialogBody}
      </div>
    </div>
  );
}

export default hot(module)(Dialog);
