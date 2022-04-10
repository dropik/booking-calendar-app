import React, { memo, useCallback } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import ClientButtonRow from "./ClientButtonRow";
import DialogList from "./DialogList";

type Props = {
  name: string,
  surname: string,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

function ClientsList({ name, surname, forceFetchRequest, isLiveUpdateEnabled, isValidated }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback(() => Api.fetchClients(name, surname), [name, surname]);

  return (
    <DialogList
      tryFetchDataAsync={tryFetchDataAsync}
      isLiveUpdateEnabled={isLiveUpdateEnabled}
      isValidated={isValidated}
      forceFetchRequest={forceFetchRequest}
    >
      {(item) => (
        <ClientButtonRow key={item.id} bookingId={item.bookingId} client={item} bookingName={item.bookingName} />
      )}
    </DialogList>
  );
}

export default memo(hot(module)(ClientsList));
