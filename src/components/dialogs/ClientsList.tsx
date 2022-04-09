import React, { memo, useEffect, useState } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import ClientRow from "./ClientRow";

type Props = {
  name: string,
  surname: string,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

function ClientsList(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [clients, setClients] = useState<Api.ClientShortData[]>();

  useEffect(() => {
    let isSubscribed = true;

    async function fetchDataAsync() {
      try {
        const response = await Api.fetchClients(props.name, props.surname);
        if (isSubscribed) {
          setClients(response.data);
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


  if (!clients || (clients.length === 0)) {
    return <h3 key="placeholder">Nessuno Cliente</h3>;
  }

  return (
    <>
      {clients.map((client) => (
        <ClientRow key={client.id} bookingId={client.bookingId} client={client} bookingName={client.bookingName} />
      ))}
    </>
  );
}

export default memo(hot(module)(ClientsList));
