import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";
import LoadingDataWrapper from "./LoadingDataWrapper";

import "./DescriptiveDialog.css";

type Props<T extends Api.BookingData | Api.ClientData> = {
  children: (data: T) => JSX.Element,
  header: (data: T | undefined) => string,
  tryFetchDataAsync: () => Promise<{ data: T }>,
}

function DataDialog<T extends Api.BookingData | Api.ClientData>(
  { children, header, tryFetchDataAsync }: Props<T>
): JSX.Element {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<T>();

  useFetchDataEffect(dispatch, setData, tryFetchDataAsync);

  return (
    <div className="scrollable">
      <DialogHeader>{header(data)}</DialogHeader>
      <LoadingDataWrapper data={data}>
        {children}
      </LoadingDataWrapper>
    </div>
  );
}

function useFetchDataEffect<T>(
  dispatch: Dispatch<AnyAction>,
  setData: Dispatch<SetStateAction<T | undefined>>,
  onTryFetchDataAsync: () => Promise<{ data: T }>
): void {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await onTryFetchDataAsync();
        setData(response.data);
      } catch (Error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }
    fetchData();
  }, [dispatch, setData, onTryFetchDataAsync]);
}

export default hot(module)(DataDialog);
