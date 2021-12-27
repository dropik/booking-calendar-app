import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import * as GrabbedTileSlice from "./grabbedTileSlice";
import * as HotelSlice from "./hotelSlice";
import { AppDispatch, RootState } from "./store";
import * as TableDimentionsSlice from "./tableDimentionsSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useInitialDate:      () => string =                      () => useAppSelector(state => state.table.initialDate);
export const useCurrentDate:      () => string =                      () => useAppSelector(state => state.table.currentDate);
export const useLeftmostDate:     () => string =                      () => useAppSelector(state => state.table.leftmostDate);
export const useColumns:          () => number =                      () => useAppSelector(state => state.columns.value);
export const useGrabbedTile:      () => GrabbedTileSlice.State =      () => useAppSelector(state => state.grabbedTile);
export const useHotelData:        () => HotelSlice.HotelData =        () => useAppSelector(state => state.hotel.data);
export const useScrollLeft:       () => number =                      () => useAppSelector(state => state.scroll.left);
export const useScrollTop:        () => number =                      () => useAppSelector(state => state.scroll.top);
export const useTableDimentions:  () => TableDimentionsSlice.State =  () => useAppSelector(state => state.tableDimentions);
