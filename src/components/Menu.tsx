import React, { ReactNode } from "react";
import List from "@mui/material/List";

import M3ListSubheader from "./m3/M3ListSubheader";
import M3ListItemButton from "./m3/M3ListItemButton";
import M3ListItemIcon from "./m3/M3ListItemIcon";
import M3ListItemText from "./m3/M3ListItemText";
import M3Divider from "./m3/M3Divider";

type Props = {
  lists: {
    subheader: string,
    items: {
      icon: ReactNode,
      text: string,
      onClick: () => void
    }[]
  }[]
}

export default function Menu({ lists }: Props): JSX.Element {
  return (
    <>
      {lists.map((list) => (
        <React.Fragment key={list.subheader}>
          <M3Divider />
          <List subheader={<M3ListSubheader>{list.subheader}</M3ListSubheader>}>
            {list.items.map((item) => (
              <M3ListItemButton key={item.text} onClick={item.onClick}>
                <M3ListItemIcon>{item.icon}</M3ListItemIcon>
                <M3ListItemText>{item.text}</M3ListItemText>
              </M3ListItemButton>
            ))}
          </List>
        </React.Fragment>
      ))}
    </>
  );
}
