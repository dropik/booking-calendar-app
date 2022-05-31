import React, { useEffect } from "react";

import { useAppDispatch } from "../redux/hooks";
import * as LayoutSlice from "../redux/layoutSlice";

export default function ResizeHandler(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function addAdjustRequest() {
      dispatch(LayoutSlice.addAdjustRequest());
    }

    window.addEventListener("resize", addAdjustRequest);
    return () => window.removeEventListener("resize", addAdjustRequest);
  }, [dispatch]);

  return <></>;
}
