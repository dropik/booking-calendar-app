import React from "react";
import { hot } from "react-hot-loader";

import "./UnassignedCell.css";

type Props = {
  tileId: string,
  x: string
};

function UnassignedCell(props: Props): JSX.Element {
  return (<div className="unassigned-cell"></div>);
}

export default hot(module)(UnassignedCell);
