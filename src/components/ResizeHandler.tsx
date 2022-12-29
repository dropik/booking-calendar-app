import React, { useEffect } from "react";

import { useAppDispatch } from "../redux/hooks";
import { addAdjustRequest } from "../redux/layoutSlice";

export default function ResizeHandler(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function dispatchAddAdjustRequest(): void {
      dispatch(addAdjustRequest());
    }

    window.addEventListener("resize", dispatchAddAdjustRequest);
    return () => {
      window.removeEventListener("resize", dispatchAddAdjustRequest);
    };
  }, [dispatch]);

  return <></>;
}
