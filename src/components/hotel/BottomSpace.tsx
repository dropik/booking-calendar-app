import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../redux/hooks";

import "./BottomSpace.css";

function BottomSpace(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const offsetHeight = useTableOffsetHeight();
  const clientHeight = useTableClientHeight();
  const scrollbarWidth = offsetHeight - clientHeight - 1;

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = `${scrollbarWidth}px`;
    }
  }, [scrollbarWidth]);

  if (scrollbarWidth > 0) {
    return (<div ref={ref} className="scrollbar-space"></div>);
  }
  return <></>;
}

function useTableOffsetHeight() {
  return useAppSelector(state => state.table.offsetHeight);
}

function useTableClientHeight() {
  return useAppSelector(state => state.table.clientHeight);
}

export default hot(module)(BottomSpace);
