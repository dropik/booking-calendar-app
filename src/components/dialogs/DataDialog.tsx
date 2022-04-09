import React, { Dispatch, ReactNode, useEffect } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";
import LoadingDataWrapper from "./LoadingDataWrapper";

type Props = {
  children: ReactNode,
  header: string,
  data: {
    id: string
  },
  onTryFetchDataAsync: () => Promise<void>,
}

function DataDialog({ children, header, data, onTryFetchDataAsync }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  useFetchDataEffect(dispatch, onTryFetchDataAsync);

  return (
    <div className="scrollable">
      <DialogHeader>{header}</DialogHeader>
      <LoadingDataWrapper isLoaded={data.id.length > 0}>
        {children}
      </LoadingDataWrapper>
    </div>
  );
}

function useFetchDataEffect(dispatch: Dispatch<AnyAction>, onTryFetchDataAsync: () => Promise<void>): void {
  useEffect(() => {
    async function fetchData() {
      try {
        await onTryFetchDataAsync();
      } catch (Error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }
    fetchData();
  }, [dispatch, onTryFetchDataAsync]);
}

export default hot(module)(DataDialog);
