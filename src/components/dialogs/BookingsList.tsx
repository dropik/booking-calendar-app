import React, { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import BookingRow from "./BookingRow";

type Props = {
  nameOrId: string,
  from: string,
  to: string,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

function BookingsList({ nameOrId, from, to, forceFetchRequest, isLiveUpdateEnabled, isValidated }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [bookings, setBookings] = useState<Api.BookingShortData[]>();

  useFetchListEffect({ nameOrId, from, to, forceFetchRequest, isLiveUpdateEnabled, isValidated }, dispatch, setBookings);

  if (!bookings || (bookings.length === 0)) {
    return <h3 key="placeholder">Nessuna Prenotazione</h3>;
  }

  return (
    <>
      {bookings.map((booking) => (
        <BookingRow key={booking.id} data={booking} />
      ))}
    </>
  );
}

function useFetchListEffect(
  { nameOrId, from, to, forceFetchRequest, isLiveUpdateEnabled, isValidated }: Props,
  dispatch: Dispatch<AnyAction>,
  setBookings: Dispatch<SetStateAction<Api.BookingShortData[] | undefined>>
): void {
  useEffect(() => {
    let isSubscribed = true;

    async function fetchDataAsync() {
      try {
        const response = await Api.fetchBookings(nameOrId, from, to);
        if (isSubscribed) {
          setBookings(response.data);
        }
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }

    if (isLiveUpdateEnabled && isValidated) {
      fetchDataAsync();
    }

    return () => { isSubscribed = false; };
  }, [nameOrId, from, to, forceFetchRequest, isLiveUpdateEnabled, isValidated, dispatch, setBookings]);
}

export default memo(hot(module)(BookingsList));
