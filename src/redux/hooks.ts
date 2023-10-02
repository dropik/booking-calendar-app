import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { Utils } from "../utils";
import { AppDispatch, RootState } from "./store";
import { Floors } from "./floorsSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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

export function useFloorRoomIds(floorId: number): number[] {
  return useAppSelector(state => {
    const result: number[] = [];
    for (const roomId in state.rooms.data) {
      const room = state.rooms.data[roomId];
      if (room.floorId === floorId) {
        result.push(Number.parseInt(roomId));
      }
    }
    return result;
  });
}

export function useRightmostDate(): string {
  return useAppSelector((state) => Utils.getDateShift(state.table.leftmostDate, state.table.columns - 1));
}

export const useLeftmostDate:       () => string =
  () => useAppSelector(state => state.table.leftmostDate);

export const useColumns:            () => number =
  () => useAppSelector(state => state.table.columns);

export const useFloors:          () => Floors =
  () => useAppSelector(state => state.floors.data);
