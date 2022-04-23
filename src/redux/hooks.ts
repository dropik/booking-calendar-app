import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as Store from "./store";
import * as Utils from "../utils";
import * as HotelSlice from "./hotelSlice";
import * as TilesSlice from "./tilesSlice";

export const useAppDispatch = () => useDispatch<Store.AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Store.RootState> = useSelector;

export function useCurrentDate(): string {
  return useAppSelector((state) => {
    const cellWidth = Utils.remToPx(4) + 2;
    const dateShift = Math.floor(
      (state.scroll.left + cellWidth / 2) / cellWidth
    );
    const newDate = new Date(state.table.leftmostDate);
    newDate.setDate(newDate.getDate() + dateShift);
    return Utils.dateToString(newDate);
  });
}

export function useTileData(id: string | undefined): TilesSlice.TileData | undefined {
  return useAppSelector((state) => {
    return (id === undefined) ? undefined : state.tiles.data[id];
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

export function useLeftShift(fromDate: string | undefined, drawerWidth: string): number {
  return useAppSelector((state) => {
    if (fromDate) {
      const daysShift = Utils.daysBetweenDates(state.table.leftmostDate, fromDate);
      const cellWidth = Utils.remToPx(4) + 2;
      const hotelBarShift = Utils.remToPx(6.5) + 4;
      const drawerWidthPx = Utils.remToPx(Number.parseFloat(drawerWidth.replace("rem", "")));
      const drawerShift = state.drawer.open ? drawerWidthPx : 0;
      return drawerShift + hotelBarShift + daysShift * cellWidth - state.scroll.left;
    } else return 0;
  });
}

export const useLeftmostDate:       () => string =
  () => useAppSelector(state => state.table.leftmostDate);

export const useColumns:            () => number =
  () => useAppSelector(state => state.table.columns);

export const useHotelData:          () => HotelSlice.HotelData =
  () => useAppSelector(state => state.hotel.data);
