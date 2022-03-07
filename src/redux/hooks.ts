import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as Store from "./store";
import * as Utils from "../utils";
import * as HotelSlice from "./hotelSlice";
import * as TableSlice from "./tableSlice";
import * as TilesSlice from "./tilesSlice";
import * as AssignedTilesSlice from "./assignedTilesSlice";

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
    return state.assignedTiles.map[y][x];
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

export const useIsGrabbedTile:      (id: string | undefined) => boolean =
  (id: string | undefined) => useAppSelector(state => state.assignedTiles.grabbedMap[id as string]);

export const useLastTileUpdate:     () => AssignedTilesSlice.TileDataUpdate | undefined =
  () => useAppSelector(state => state.assignedTiles.lastUpdate);

export const useHoveredId:          () => string | undefined =
  () => useAppSelector(state => state.hoveredId.value);

export const useIsGrabbing:         () => boolean =
  () => useAppSelector(state => state.assignedTiles.grabbedX !== undefined);

export const useHasUnassignedTiles: (x: string) => boolean =
  (x: string) => useAppSelector(state => (state.unassignedTiles.map[x] !== undefined) && (Object.keys(state.unassignedTiles.map[x]).length > 0));

export const usePersonsInRoomType:  (type: string) => number[] =
  (type: string) => useAppSelector(state => state.roomTypes.data[type]);
