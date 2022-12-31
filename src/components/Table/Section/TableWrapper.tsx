import React, { useEffect, useMemo, useRef } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { scrollX } from "../../../redux/tableSlice";

type TableWrapperProps = {
  children: React.ReactNode,
}

export default function TableWrapper({ children }: TableWrapperProps): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);
  const loadingState = useAppSelector(state => state.tiles.status);

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
    <>
      <Stack ref={ref} onScroll={onScroll} sx={{
        flexGrow: 1,
        maxWidth: "calc(100% - 7.5rem - 1px)",
        ...{ overflowX: "scroll" },
        ...{ overflowX: "overlay" },
        position: "relative",
      }}>
        {childrenMemo}
        {loadingState === "loading" ? (
          <>
            <Box sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: ref.current?.scrollWidth ?? "100%",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}>
            </Box>
          </>
        ): null}
      </Stack>
      {loadingState === "loading" ? (
        <Box sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "calc(7.5rem + 1px)",
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}>
          <CircularProgress size="5rem" />
        </Box>
      ) : null}
    </>
  );
}
