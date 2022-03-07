import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as Store from "./store";
import * as Utils from "../utils";
import * as HotelSlice from "./hotelSlice";
import * as TableSlice from "./tableSlice";
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

export function useRoomTypeByNumber(roomNumber: number): string {
  return useAppSelector((state) => {
    for (const floor of state.hotel.data.floors) {
      for (const room of floor.rooms) {
        if (room.number === roomNumber) {
          return room.type;
        }
      }
    }
    return "";
  });
}

export function useTileIdByCoords(x: string, y: number): string | undefined {
  return useAppSelector((state) => {
    return state.tiles.assignedMap[y][x];
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

export function useLeftShift(fromDate: string | undefined): number {
  return useAppSelector((state) => {
    if (fromDate) {
      const daysShift = Utils.daysBetweenDates(state.table.leftmostDate, fromDate);
      const cellWidth = Utils.remToPx(4) + 2;
      const hotelBarShift = Utils.remToPx(6.5) + 4;
      return hotelBarShift + daysShift * cellWidth - state.scroll.left;
    } else return 0;
  });
}

export const useLeftmostDate:       () => string =
  () => useAppSelector(state => state.table.leftmostDate);

export const useColumns:            () => number =
  () => useAppSelector(state => state.table.columns);

export const useLastFetchPeriod:    () => TableSlice.FetchPeriod =
  () => useAppSelector(state => state.table.lastFetchPeriod);

export const useTableOffsetHeight:  () => number =
  () => useAppSelector(state => state.table.offsetHeight);

export const useTableClientHeight:  () => number =
  () => useAppSelector(state => state.table.clientHeight);

export const useHotelData:          () => HotelSlice.HotelData =
  () => useAppSelector(state => state.hotel.data);

export const useScrollLeft:         () => number =
  () => useAppSelector(state => state.scroll.left);

export const useScrollTop:          () => number =
  () => useAppSelector(state => state.scroll.top);

export const useIsGrabbedTile:      (id: string) => boolean =
  (id: string) => useAppSelector(state => state.tiles.grabbedMap[id]);

export const useHoveredId:          () => string | undefined =
  () => useAppSelector(state => state.hoveredId.value);

export const useIsGrabbing:         () => boolean =
  () => useAppSelector(state => state.tiles.grabbedTile !== undefined);

export const useHasUnassignedTiles: (x: string) => boolean =
  (x: string) => useAppSelector(state => (state.tiles.unassignedMap[x] !== undefined) && (Object.keys(state.tiles.unassignedMap[x]).length > 0));

export const usePersonsInRoomType:  (type: string) => number[] =
  (type: string) => useAppSelector(state => state.roomTypes.data[type]);
