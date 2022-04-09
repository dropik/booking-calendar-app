import React, { memo, useCallback } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import BookingRow from "./BookingRow";
import DialogList from "./DialogList";

type Props = {
  nameOrId: string,
  from: string,
  to: string,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

function BookingsList({ nameOrId, from, to, forceFetchRequest, isLiveUpdateEnabled, isValidated }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchBookings(nameOrId, from, to), [nameOrId, from, to]);

  return (
    <DialogList
      tryFetchDataAsync={tryFetchDataAsync}
      isLiveUpdateEnabled={isLiveUpdateEnabled}
      isValidated={isValidated}
      forceFetchRequest={forceFetchRequest}
    >
      {(item) => (
        <BookingRow key={item.id} data={item} />
      )}
    </DialogList>
  );
}

export default memo(hot(module)(BookingsList));
