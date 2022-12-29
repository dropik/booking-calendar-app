import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

import { useAppSelector } from "../../redux/hooks";

type HorizontalScrollWrapperProps = {
  children: React.ReactNode
};

export default function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps): JSX.Element {
  const scrollLeft = useAppSelector(state => state.table.scrollLeft);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `-${scrollLeft}px`;
    }
  }, [scrollLeft]);

  return (
    <Box ref={ref} sx={{
      position: "relative",
      left: 0,
      height: "100%",
      "& > *": {
        position: "absolute",
        left: 0,
      }
    }}>
      {children}
    </Box>
  );
}
