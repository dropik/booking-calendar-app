import React, { useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";

import PoliceExportDialog from "./dialogs/PoliceExportDialog";
import IstatExportDialog from "./dialogs/IstatExportDialog";
import TaxDialog from "./dialogs/TaxDialog";
import BookingDialog from "./dialogs/BookingDialog";
import FindBookingDialog from "./dialogs/FindBookingDialog";

import "./Dialog.css";
import ClientDialog from "./dialogs/ClientDialog";

function Dialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const dialogs = useAppSelector((state) => state.dialog.dialogs);
  const ref = useRef<HTMLDivElement>(null);

  function closeAllDialogs() {
    dispatch(DialogSlice.closeAll());
  }

  function handleDialogAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    const classList = event.currentTarget.classList;
    if (classList.contains("show")) {
      classList.remove("show");
    } else if (classList.contains("hide")) {
      closeAllDialogs();
    }
  }

  function fadeOutDialog() {
    if (ref.current) {
      ref.current.classList.add("hide");
    }
  }

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  if (dialogs.length === 0) {
    return <></>;
  }

  const dialogComponents: JSX.Element[] = dialogs.map((dialog, index) => {
    let component: JSX.Element;
    let dialogClassName = "dialog";
    let key: string;
    const showGoBackButton = index !== 0;

    if (index < dialogs.length - 1) {
      dialogClassName += " hidden";
    }

    switch (dialog.type) {
    case "police":
      key = `police#${index}`;
      component = <PoliceExportDialog showGoBackButton={showGoBackButton} fadeOutDialog={fadeOutDialog} />;
      break;
    case "istat":
      key=`istat#${index}`;
      component = <IstatExportDialog showGoBackButton={showGoBackButton} fadeOutDialog={fadeOutDialog} />;
      break;
    case "cityTax":
      key=`cityTax#${index}`;
      component = <TaxDialog showGoBackButton={showGoBackButton} fadeOutDialog={fadeOutDialog} />;
      break;
    case "booking":
      key=`booking-${dialog.tile}#${index}`;
      dialogClassName += " scrollable";
      component = <BookingDialog bookingId={dialog.id} tileId={dialog.tile} showGoBackButton={showGoBackButton} fadeOutDialog={fadeOutDialog} />;
      break;
    case "findBooking":
      key=`findBooking#${index}`;
      dialogClassName += " scrollable";
      component = <FindBookingDialog showGoBackButton={showGoBackButton} fadeOutDialog={fadeOutDialog} />;
      break;
    case "client":
      key=`client-${dialog.clientId}#${index}`;
      dialogClassName += " scrollable";
      component = <ClientDialog bookingId={dialog.bookingId} clientId={dialog.clientId} showGoBackButton={showGoBackButton} fadeOutDialog={fadeOutDialog} />;
      break;
    }

    return (
      <div key={key} className={dialogClassName} onClick={preventHideOnSelfClick}>
        {component}
      </div>
    );
  });


  return (
    <div
      ref={ref}
      className="dialog-container show"
      onClick={fadeOutDialog}
      onAnimationEnd={handleDialogAnimationEnd}
    >
      {dialogComponents}
    </div>
  );
}

export default hot(module)(Dialog);
