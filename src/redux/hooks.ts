import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCurrentDate = () => useAppSelector(state => state.main.currentDate);
export const useScrollLeft = () => useAppSelector(state => state.main.scrollLeft);
export const useScrollTop = () => useAppSelector(state => state.main.scrollTop);
export const useStartDate = () => useAppSelector(state => state.main.startDate);
export const useColumns = () => useAppSelector(state => state.main.columns);
export const useHotel = () => useAppSelector(state => state.hotel.data);
export const useGrabbedTile = () => useAppSelector(state => state.grabbedTile);
