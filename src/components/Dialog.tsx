import React, { useEffect, useRef, useState } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";
import * as Api from "../api";

import DialogHeader from "./dialogs/DialogHeader";
import ExportDialogBody from "./dialogs/ExportDialogBody";
import TaxDialogBody from "./dialogs/TaxDialogBody";
import BookingDialogHeader from "./dialogs/BookingDialogHeader";
import BookingDialogBody from "./dialogs/BookingDialogBody";

import "./Dialog.css";

function Dialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedDialog = useAppSelector((state) => state.dialog.selectedDialog);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const [bookingData, setBookingData] = useState<Api.BookingData>();

  useEffect(() => {
    if (selectedDialog === "booking") {
      setBookingData({
        id: "1",
        name: "Vasya Pupkin",
        from: "2022-02-02",
        to: "2022-02-05",
        rooms: [
          {
            id: "1",
            type: "camera matrimoniale/doppia",
            entity: "camera matrimoniale",
            guests: [
              {
                id: "0",
                name: "Vasya",
                surname: "Pupkin",
                dateOfBirth: "1985-05-06"
              },
              {
                id: "1",
                name: "Masha",
                surname: "Pupkina",
                dateOfBirth: "1987-07-20"
              }
            ]
          }
        ]
      });
    }
  }, [selectedDialog]);

  function hideDialog() {
    dispatch(DialogSlice.hide());
    setBookingData(undefined);
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

  let dialogHeader: JSX.Element;
  if (selectedDialog === "booking") {
    if (bookingData) {
      dialogHeader = <BookingDialogHeader data={bookingData} fadeOutDialog={fadeOutDialog} />;
    } else {
      dialogHeader = <></>;
    }
  } else {
    dialogHeader = <DialogHeader type={selectedDialog} fadeOutDialog={fadeOutDialog} />;
  }

  let dialogBody: JSX.Element;
  if (selectedDialog === "cityTax") {
    dialogBody = <TaxDialogBody fadeOutDialog={fadeOutDialog} />;
  } else if (selectedDialog === "booking") {
    dialogBody = <BookingDialogBody />;
  } else {
    dialogBody = <ExportDialogBody type={selectedDialog} fadeOutDialog={fadeOutDialog} />;
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
        {dialogHeader}
        {dialogBody}
      </div>
    </div>
  );
}

export default hot(module)(Dialog);
