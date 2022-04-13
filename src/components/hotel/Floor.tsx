import React from "react";
import { hot } from "react-hot-loader";

import "./Floor.css";

type Props = {
  name: string,
  isFollowing: boolean
};

function Floor({ name, isFollowing }: Props): JSX.Element {
  let className = "floor";
  if (isFollowing) {
    className += " floor-following";
  }
  const fullName = name[0].toLocaleUpperCase() + name.substring(1, name.length);

  return <div className={className}>{fullName}</div>;
}

export default hot(module)(Floor);
