import React, { useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";

import PoliceExportDialog from "./dialogs/PoliceExportDialog";
import IstatExportDialog from "./dialogs/IstatExportDialog";
import TaxDialog from "./dialogs/TaxDialog";
import BookingDialog from "./dialogs/BookingDialog";

import "./Dialog.css";

function Dialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedDialog = useAppSelector((state) => state.dialog.selectedDialog);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogContainerRef = useRef<HTMLDivElement>(null);


  function hideDialog() {
    dispatch(DialogSlice.hide());
  }

  function handleDialogAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    const classList = event.currentTarget.classList;
    if (classList.contains("show")) {
      classList.remove("show");
    } else if (classList.contains("hide")) {
      hideDialog();
    }
  }

  function fadeOutDialog() {
    if (dialogRef.current) {
      dialogRef.current.classList.add("hide");
    }
    if (dialogContainerRef.current) {
      dialogContainerRef.current.classList.add("hide");
    }
  }

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  if (!selectedDialog) {
    return <></>;
  }

  let dialog: JSX.Element;
  switch (selectedDialog) {
  case "police":
    dialog = <PoliceExportDialog fadeOutDialog={fadeOutDialog} />;
    break;
  case "istat":
    dialog = <IstatExportDialog fadeOutDialog={fadeOutDialog} />;
    break;
  case "cityTax":
    dialog = <TaxDialog fadeOutDialog={fadeOutDialog} />;
    break;
  case "booking":
    dialog = <BookingDialog fadeOutDialog={fadeOutDialog} />;
    break;
  }

  return (
    <div
      ref={dialogContainerRef}
      className="dialog-container show"
      onClick={fadeOutDialog}
      onAnimationEnd={handleDialogAnimationEnd}
    >
      <div
        ref={dialogRef}
        className="dialog show"
        onClick={preventHideOnSelfClick}
        onAnimationEnd={handleDialogAnimationEnd}
      >
        {dialog}
      </div>
    </div>
  );
}

export default hot(module)(Dialog);
