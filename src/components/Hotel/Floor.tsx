import React from "react";

import "./Floor.css";

type Props = {
  name: string,
  isFollowing: boolean
};

export default function Floor({ name, isFollowing }: Props): JSX.Element {
  let className = "floor";
  if (isFollowing) {
    className += " floor-following";
  }
  const fullName = name[0].toLocaleUpperCase() + name.substring(1, name.length);

  return <div className={className}>{fullName}</div>;
}
