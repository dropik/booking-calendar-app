import React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import HorizontalScrollWrapper from "../../HorizontalScrollWrapper";
import { useAppDispatch } from "../../../../redux/hooks";
import { scrollX } from "../../../../redux/tableSlice";

export default function Body({ children, ...props }: BoxProps): JSX.Element {
  const dispatch = useAppDispatch();

  function onWheel(event: React.WheelEvent<HTMLDivElement>): void {
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const deltaX = event.deltaX ?? 0;
    dispatch(scrollX(deltaX));
  }

  return (
    <Box {...props} onWheel={onWheel} sx={{
      position: "relative",
      ml: "calc(7.5rem + 1px)",
      overflow: "hidden",
      width: "calc(100% - 7.5rem - 1px)",
      height: "calc(5.5rem - 1px)",
      ...props.sx,
    }}>
      <HorizontalScrollWrapper>
        {children}
      </HorizontalScrollWrapper>
    </Box>
  );
}
