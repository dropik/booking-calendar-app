import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/snackbarMessageSlice";
import { FindDialogContext } from "./FindDialogBody";

type Props<T extends Api.BookingShortData | Api.ClientShortData> = {
  children: (item: T) => JSX.Element,
  tryFetchDataAsync: () => Promise<{ data: T[] }>,
  dataPlaceholder: string
}

export default function DialogList<T extends Api.BookingShortData | Api.ClientShortData>(
  { children, tryFetchDataAsync, dataPlaceholder }: Props<T>
): JSX.Element {
  const dispatch = useAppDispatch();
  const { isLiveUpdateEnabled, isValidated, forceFetchRequest } = useContext(FindDialogContext);
  const [data, setData] = useState<T[]>([]);

  useFetchDataEffect(dispatch, setData, tryFetchDataAsync, isLiveUpdateEnabled, isValidated, forceFetchRequest);

  if (data.length === 0) {
    return <h3 className="placeholder">{dataPlaceholder}</h3>;
  }

  return (
    <>
      {data.map((item) => children(item))}
    </>
  );
}

function useFetchDataEffect<T>(
  dispatch: Dispatch<AnyAction>,
  setData: Dispatch<SetStateAction<T[]>>,
  tryFetchDataAsync: () => Promise<{ data: T[] }>,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean,
  forceFetchRequest: number
): void {
  useEffect(() => {
    let isSubscribed = true;

    async function fetchDataAsync() {
      try {
        const response = await tryFetchDataAsync();
        if (isSubscribed) {
          setData(response.data);
        }
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }

    if (isLiveUpdateEnabled && isValidated) {
      fetchDataAsync();
    }

    return () => { isSubscribed = false; };
  }, [dispatch, setData, tryFetchDataAsync, isLiveUpdateEnabled, isValidated, forceFetchRequest]);
}
