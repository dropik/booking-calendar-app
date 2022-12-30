import React, { useEffect, useMemo, useRef } from "react";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { scrollX } from "../../../redux/tableSlice";

type TableWrapperProps = {
  children: React.ReactNode,
}

export default function TableWrapper({ children }: TableWrapperProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);

  function onScroll(event: React.UIEvent<HTMLDivElement>): void {
    const scrollLeft = event.currentTarget?.scrollLeft;
    if (scrollLeft !== undefined && scrollLeft !== null) {
      dispatch(scrollX(scrollLeft));
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(scrollLeft, 0);
    }
  }, [scrollLeft]);

  const childrenMemo = useMemo(() => children, [children]);

  return (
    <Stack ref={ref} onScroll={onScroll} sx={{
      flexGrow: 1,
      maxWidth: "calc(100% - 7.5rem - 1px)",
      overflowX: "scroll",
    }}>
      {childrenMemo}
    </Stack>
  );
}
