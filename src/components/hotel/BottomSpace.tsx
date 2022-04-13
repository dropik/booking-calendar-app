import React, { useLayoutEffect, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../redux/hooks";

import "./BottomSpace.css";

function BottomSpace(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const offsetHeight = useAppSelector(state => state.table.offsetHeight);
  const clientHeight = useAppSelector(state => state.table.clientHeight);
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

export default hot(module)(BottomSpace);
