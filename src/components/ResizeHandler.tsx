import React, { useEffect } from "react";

import { useAppDispatch } from "../redux/hooks";
import { addAdjustRequest } from "../redux/layoutSlice";
import { adjustColumns } from "../redux/tableSlice";

export default function ResizeHandler(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function dispatchAddAdjustRequest(): void {
      dispatch(addAdjustRequest());
    }

    function dispatchAdjustColumns(): void {
      dispatch(adjustColumns());
    }

    window.addEventListener("resize", dispatchAddAdjustRequest);
    window.addEventListener("resize", dispatchAdjustColumns);
    return () => {
      window.removeEventListener("resize", dispatchAddAdjustRequest);
      window.removeEventListener("resize", dispatchAdjustColumns);
    };
  }, [dispatch]);

  return <></>;
}
