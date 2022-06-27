import { useEffect } from "react";

import { AsyncThunkAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";

type FetchDataBaseProps<TData, TArgs> = {
  fetchCallbackAsync: AsyncThunkAction<TData, TArgs, {}>
}

export default function FetchDataBase<TData, TArgs>({ fetchCallbackAsync }: FetchDataBaseProps<TData, TArgs>): null {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCallbackAsync);
  }, [dispatch, fetchCallbackAsync]);

  return null;
}
