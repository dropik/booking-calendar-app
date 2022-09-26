import { useEffect } from "react";

import * as ScrollSlice from "../redux/scrollSlice";
import { useAppDispatch } from "../redux/hooks";

export default function ScrollingHandler(): null {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function updateScrollTop(this: Window) {
      dispatch(ScrollSlice.set({ top: this.scrollY }));
    }
    window.addEventListener("scroll", updateScrollTop);
    return () => window.removeEventListener("scroll", updateScrollTop);
  }, [dispatch]);

  return null;
}
