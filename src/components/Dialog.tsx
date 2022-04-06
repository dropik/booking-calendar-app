import React, { createContext, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";

import PoliceExportDialog from "./dialogs/PoliceExportDialog";
import IstatExportDialog from "./dialogs/IstatExportDialog";
import TaxDialog from "./dialogs/TaxDialog";
import BookingDialog from "./dialogs/BookingDialog";
import FindBookingDialog from "./dialogs/FindBookingDialog";
import ClientDialog from "./dialogs/ClientDialog";
import FindClientDialog from "./dialogs/FindClientDialog";

import "./Dialog.css";

export type DialogContextType = {
  showGoBackButton: boolean,
  fadeOutDialog: () => void
};
export const DialogContext = createContext<DialogContextType>({ showGoBackButton: false, fadeOutDialog: () => void 0 });

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
    const contextValue = { showGoBackButton: index !== 0, fadeOutDialog };

    let dialogClassName = "dialog";
    if (index < dialogs.length - 1) {
      dialogClassName += " hidden";
    }

    let component: JSX.Element;
    switch (dialog.type) {
    case "police":
      component = <PoliceExportDialog />;
      break;
    case "istat":
      component = <IstatExportDialog />;
      break;
    case "cityTax":
      component = <TaxDialog />;
      break;
    case "booking":
      component = <BookingDialog bookingId={dialog.id} tileId={dialog.tile} />;
      break;
    case "findBooking":
      component = <FindBookingDialog />;
      break;
    case "client":
      component = <ClientDialog bookingId={dialog.bookingId} clientId={dialog.clientId} />;
      break;
    case "findClient":
      component = <FindClientDialog />;
      break;
    }

    return (
      <div key={index} className={dialogClassName} onClick={preventHideOnSelfClick}>
        <DialogContext.Provider value={contextValue}>
          {component}
        </DialogContext.Provider>
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
