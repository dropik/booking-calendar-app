import React from "react";

import { NestedMenuProps } from "./NestedMenu";

import M3Menu from "../m3/M3Menu";
import ListNestedMenu from "./ListNestedMenu";

export default function NestedMenuSwitch(props: NestedMenuProps): JSX.Element {
  return ("list" in props) ?
    <ListNestedMenu {...props} /> :
    <M3Menu {...props} />;
}
