import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as Store from "./store";
import * as Utils from "../utils";
import * as HotelSlice from "./hotelSlice";
import * as TableSlice from "./tableSlice";

export const useAppDispatch = () => useDispatch<Store.AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Store.RootState> = useSelector;

export function useCurrentDate(): string {
  return useAppSelector(state => {
    const cellWidth = Utils.remToPx(4) + 1;
    const dateShift = Math.floor(
      (state.scroll.left + cellWidth / 2) / cellWidth
    );
    const newDate = new Date(state.table.leftmostDate);
    newDate.setDate(newDate.getDate() + dateShift);
    return Utils.dateToString(newDate);
  });
}

export function useTableDimentions(): { offsetHeight: number, clientHeight: number } {
  return useAppSelector(state => {
    return {
      offsetHeight: state.table.offsetHeight,
      clientHeight: state.table.clientHeight
    };
  });
}

export function useTileIdByCoords(x: string, y: number): number {
  return useAppSelector(state => {
    const id = state.tiles[y][x];
    return id === undefined ? -1 : id;
  });
}

export function useDates(): Generator<string, void, void> {
  const dateCounter = new Date(useAppSelector(state => state.table.leftmostDate));
  const columns = useAppSelector(state => state.table.columns);

  return function*(): Generator<string, void, void> {
    for (let i = 0; i < columns; i++) {
      yield Utils.dateToString(dateCounter);
      dateCounter.setDate(dateCounter.getDate() + 1);
    }
  }();
}

export const useLeftmostDate:     () => string =                      () => useAppSelector(state => state.table.leftmostDate);
export const useColumns:          () => number =                      () => useAppSelector(state => state.table.columns);
export const useLastFetchPeriod:  () => TableSlice.FetchPeriod =      () => useAppSelector(state => state.table.lastFetchPeriod);
export const useHotelData:        () => HotelSlice.HotelData =        () => useAppSelector(state => state.hotel.data);
export const useScrollLeft:       () => number =                      () => useAppSelector(state => state.scroll.left);
export const useScrollTop:        () => number =                      () => useAppSelector(state => state.scroll.top);
