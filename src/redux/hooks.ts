import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as Utils from "../utils";
import { AppDispatch, RootState } from "./store";
import { Floors } from "./floorsSlice";
import { TileData } from "./tilesSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useTileData(id: string | undefined): TileData | undefined {
  return useAppSelector((state) => {
    return (id === undefined) ? undefined : state.tiles.data[id];
  });
}

export function useDates(useOneDayBefore = false): string[] {
  const dateCounter = new Date(useAppSelector(state => state.table.leftmostDate));
  if (useOneDayBefore) {
    dateCounter.setDate(dateCounter.getDate() - 1);
  }
  const columns = useAppSelector(state => state.table.columns);
  const dates: string[] = [];

  for (let i = useOneDayBefore ? -1 : 0; i < columns; i++) {
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

export function useRightmostDate(): string {
  return useAppSelector((state) => Utils.getDateShift(state.table.leftmostDate, state.table.columns - 1));
}

export function useErrorType(id: string): "none" | "warning" | "error" {
  return useAppSelector((state) => {
    const data = state.tiles.data[id];
    if (data && data.roomId) {
      const assignedRoomType = state.rooms.data[data.roomId].type;
      const occupancy = state.roomTypes.data[assignedRoomType];
      if (occupancy) {
        if ((data.persons < occupancy.minOccupancy) || (data.persons > occupancy.maxOccupancy)) {
          return "error";
        }
      }

      if (assignedRoomType !== data.roomType) {
        return "warning";
      }
    }

    return "none";
  });
}

export const useCurrentDate:        () => string =
  () => useAppSelector((state) => state.table.currentDate);

export const useLeftmostDate:       () => string =
  () => useAppSelector(state => state.table.leftmostDate);

export const useColumns:            () => number =
  () => useAppSelector(state => state.table.columns);

export const useFloors:          () => Floors =
  () => useAppSelector(state => state.floors.data);
