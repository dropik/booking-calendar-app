import React, { memo, useEffect, useState } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as DialogSlice from "../../redux/dialogSlice";

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

  function showClient(bookingId: string, clientId: string) {
    dispatch(DialogSlice.showClientDialog({ bookingId: bookingId, clientId: clientId }));
  }

  let list: JSX.Element[] = [<h3 key="placeholder">Nessuno Cliente</h3>];
  if (clients && clients.length > 0) {
    list = clients.map((client) => {
      return (
        <div key={client.id} className="row button" onClick={() => { showClient(client.bookingId, client.id); }}>
          <div className="first-name">{client.name}</div>
          <div className="last-name">{client.surname}</div>
          <div className="date-of-birth">{new Date(client.dateOfBirth).toLocaleDateString()}</div>
          <div className="booking-name">{client.bookingName}</div>
        </div>
      );
    });
  }

  return <>{list}</>;
}

export default memo(hot(module)(ClientsList));
