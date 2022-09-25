import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { adjustColumns } from "../redux/tableSlice";

export default function ColumnsAdjuster(): null {
  const dispatch = useAppDispatch();
  const drawerOpened = useAppSelector((state) => state.drawer.open);
  const requestId = useAppSelector((state) => state.layout.adjustLayoutRequestId);

  useEffect(() => {
    dispatch(adjustColumns({ drawerOpened }));
  }, [requestId, dispatch, drawerOpened]);

  return null;
}
