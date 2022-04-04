import React, { memo, useEffect, useState } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  nameOrId: string,
  from: string,
  to: string,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

function BookingsList(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [bookings, setBookings] = useState<Api.BookingShortData[]>();

  useEffect(() => {
    let isSubscribed = true;

    async function fetchDataAsync() {
      try {
        const response = await Api.fetchBookings(props.nameOrId, props.from, props.to);
        if (isSubscribed) {
          setBookings(response.data);
        }
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }

    if (props.isLiveUpdateEnabled && props.isValidated) {
      fetchDataAsync();
    }

    return () => { isSubscribed = false; };
  }, [dispatch, props]);

  function showBooking(id: string) {
    dispatch(DialogSlice.showBookingDialog({ id }));
  }

  let list: JSX.Element[] = [<h3 key="placeholder">Nessuna Prenotazione</h3>];
  if (bookings && bookings.length > 0) {
    list = bookings.map((booking) => {
      return (
        <div key={booking.id} className="row button" onClick={() => { showBooking(booking.id); }}>
          <div className="id">#{booking.id}</div>
          <div className="name">{booking.name}</div>
          <div className="from">{new Date(booking.from).toLocaleDateString()}</div>
          <div className="to">{new Date(booking.to).toLocaleDateString()}</div>
        </div>
      );
    });
  }

  return <>{list}</>;
}

export default memo(hot(module)(BookingsList));
