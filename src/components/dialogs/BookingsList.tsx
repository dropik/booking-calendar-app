import React, { memo, useCallback, useContext } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import BookingButtonRow from "./BookingButtonRow";
import DialogList from "./DialogList";
import { FindBookingDialogContext } from "./FindBookingDialogBody";

type Props = {
  nameOrId: string,
  from: string,
  to: string
};

function BookingsList({ nameOrId, from, to }: Props): JSX.Element {
  const { isLiveUpdateEnabled, isValidated, forceFetchRequest } = useContext(FindBookingDialogContext);
  const tryFetchDataAsync = useCallback(() => Api.fetchBookings(nameOrId, from, to), [nameOrId, from, to]);

  return (
    <DialogList
      tryFetchDataAsync={tryFetchDataAsync}
      isLiveUpdateEnabled={isLiveUpdateEnabled}
      isValidated={isValidated}
      forceFetchRequest={forceFetchRequest}
    >
      {(item) => (
        <BookingButtonRow key={item.id} data={item} />
      )}
    </DialogList>
  );
}

export default memo(hot(module)(BookingsList));
