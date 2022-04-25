import React, { ReactNode } from "react";
import { MenuProps } from "@mui/material/Menu";
import M3Menu from "./m3/M3Menu";
import M3MenuItem from "./m3/M3MenuItem";
import M3ListItemIcon from "./m3/M3ListItemIcon";
import M3ListItemText from "./m3/M3ListItemText";

interface Props extends MenuProps {
  list: {
    text: string,
    icon: ReactNode,
    onClick: () => void,
    disabled?: boolean
  }[];
}

export default function Menu({ list, ...props }: Props): JSX.Element {
  return (
    <M3Menu {...props}>
      {list.map((item) => (
        <M3MenuItem disabled={item.disabled} key={item.text} onClick={item.onClick}>
          <M3ListItemIcon>{item.icon}</M3ListItemIcon>
          <M3ListItemText>{item.text}</M3ListItemText>
        </M3MenuItem>
      ))}
    </M3Menu>
  );
}
