import React from "react";
import { hot } from "react-hot-loader";

import "./Floor.css";

type Props = {
  isFollowing: boolean,
  name: string
};

function Floor(props: Props) {
  let className = "floor";
  if (props.isFollowing) {
    className += " floor-following";
  }
  const name = props.name[0].toLocaleUpperCase() + props.name.substring(1, props.name.length);

  return <div className={className}>{name}</div>;
}

export default hot(module)(Floor);
