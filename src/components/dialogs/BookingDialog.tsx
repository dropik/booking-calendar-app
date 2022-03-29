import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import BookingDialogBody from "./BookingDialogBody";

import * as Api from "../../api";

import BookingDialogHeader from "./BookingDialogHeader";

type Props = {
  fadeOutDialog: () => void
};

function BookingDialog(props: Props): JSX.Element {
  const [bookingData, setBookingData] = useState<Api.BookingData>();

  useEffect(() => {
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
  }, []);

  const header = bookingData ?
    <BookingDialogHeader data={bookingData} fadeOutDialog={props.fadeOutDialog} /> :
    <></>;

  return (
    <>
      {header}
      <BookingDialogBody />
    </>
  );
}

export default hot(module)(BookingDialog);
