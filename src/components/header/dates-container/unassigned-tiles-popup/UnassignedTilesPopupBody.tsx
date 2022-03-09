import React, { useLayoutEffect, useMemo, useRef } from "react";
import { hot } from "react-hot-loader";

import { useLeftShift } from "../../../../redux/hooks";

import UnassignedRow from "./UnassignedRow";

import "./UnassignedTilesPopupBody.css";

type Props = {
  leftmostSelectedTileDate: string,
  tilesPerSelectedDay: { [key: string]: string }
}

function UnassignedTilesPopupBody(props: Props): JSX.Element {
  const left = useLeftShift(props.leftmostSelectedTileDate);
  const ref = useRef<HTMLDivElement>(null);
  const rows = useRowsMemo(props.tilesPerSelectedDay, props.leftmostSelectedTileDate);

  useScrollEffect(ref, left);

  return (<div ref={ref} className="unassigned-tiles-popup-body">{rows}</div>);
}

function useRowsMemo(tilesPerSelectedDay: { [key: string]: string }, leftmostSelectedTileDate: string): JSX.Element[] {
  return useMemo(() => {
    const rows: JSX.Element[] = [];
    for (const tileId in tilesPerSelectedDay) {
      rows.push(<UnassignedRow key={tileId} tileId={tileId} leftmostSelectedTileDate={leftmostSelectedTileDate} />);
    }
    return rows;
  }, [tilesPerSelectedDay, leftmostSelectedTileDate]);
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, left: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${left}px`;
    }
  }, [ref, left]);
}

export default hot(module)(UnassignedTilesPopupBody);