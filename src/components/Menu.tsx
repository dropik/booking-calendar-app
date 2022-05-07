import React, { ReactNode } from "react";
import { MenuProps } from "@mui/material/Menu";

import M3Menu from "./m3/M3Menu";
import M3MenuItem from "./m3/M3MenuItem";
import M3ListItemIcon from "./m3/M3ListItemIcon";
import M3ListItemText from "./m3/M3ListItemText";

type ListItemData = {
  text: string,
  icon: ReactNode,
  disabled?: boolean
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
} | {
  text: string,
  icon: ReactNode,
  disabled?: boolean,
  list: ListItemData[]
};

interface Props extends MenuProps {
  onAnyItemClick: () => void;
  list: ListItemData[];
}

export default function Menu({ list, onAnyItemClick, ...props }: Props): JSX.Element {
  return (
    <M3Menu {...props}>
      {list.map((item) => (
        <M3MenuItem
          key={item.text}
          disabled={item.disabled}
          onClick={(event) => {
            if ("onClick" in item) {
              item.onClick(event);
              onAnyItemClick();
            }
          }}
        >
          <M3ListItemIcon>{item.icon}</M3ListItemIcon>
          <M3ListItemText>{item.text}</M3ListItemText>
        </M3MenuItem>
      ))}
    </M3Menu>
  );
}
