import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as Store from "./store";
import * as Utils from "../utils";
import * as HotelSlice from "./hotelSlice";
import * as TilesSlice from "./tilesSlice";

export const useAppDispatch = () => useDispatch<Store.AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<Store.RootState> = useSelector;

export function useTileData(id: string | undefined): TilesSlice.TileData | undefined {
  return useAppSelector((state) => {
    return (id === undefined) ? undefined : state.tiles.data[id];
  });
}

export function useDates(): string[] {
  const dateCounter = new Date(useAppSelector(state => state.table.leftmostDate));
  const columns = useAppSelector(state => state.table.columns);
  const dates: string[] = [];

  for (let i = 0; i < columns; i++) {
    dates.push(Utils.dateToString(dateCounter));
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return dates;
}

export function useLeftShift(fromDate: string | undefined, drawerWidth: string): number {
  return useAppSelector((state) => {
    if (fromDate) {
      const daysShift = Utils.daysBetweenDates(state.table.leftmostDate, fromDate);
      const cellWidth = Utils.remToPx(4) + 2;
      const hotelBarShift = Utils.remToPx(6.5) + 4;
      const drawerWidthPx = Utils.remToPx(Number.parseFloat(drawerWidth.replace("rem", "")));
      const drawerShift = state.drawer.open ? drawerWidthPx : 0;
      return drawerShift + hotelBarShift + daysShift * cellWidth;
    } else return 0;
  });
}

export const useCurrentDate:        () => string =
  () => useAppSelector((state) => state.table.currentDate);

export const useLeftmostDate:       () => string =
  () => useAppSelector(state => state.table.leftmostDate);

export const useColumns:            () => number =
  () => useAppSelector(state => state.table.columns);

export const useHotelData:          () => HotelSlice.HotelData =
  () => useAppSelector(state => state.hotel.data);
