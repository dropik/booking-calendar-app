import React, { ReactNode } from "react";
import List from "@mui/material/List";

import M3ListSubheader from "../m3/M3ListSubheader";
import M3ListItemButton from "../m3/M3ListItemButton";
import M3ListItemIcon from "../m3/M3ListItemIcon";
import M3ListItemText from "../m3/M3ListItemText";
import M3Divider from "../m3/M3Divider";
import M3NavLink from "../m3/M3NavLink";

type Props = {
  lists: {
    subheader?: string,
    items: {
      icon: ReactNode,
      text: string,
      link: string,
      end: boolean,
      onClick: () => void
    }[]
  }[]
}

export default function DrawerLists({ lists }: Props): JSX.Element {
  return (
    <>
      {lists.map((list) => (
        <React.Fragment key={list.subheader ? list.subheader : list.items.toString()}>
          {list.subheader ? <M3Divider /> : <></>}
          <List
            sx={{ paddingBottom: "1rem" }}
            subheader={
              <M3ListSubheader>{list.subheader ? list.subheader : ""}</M3ListSubheader>
            }
          >
            {list.items.map((item) => (
              <M3NavLink key={item.link} end={item.end} to={item.link} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <M3ListItemButton onClick={item.onClick} selected={isActive}>
                    <M3ListItemIcon>{item.icon}</M3ListItemIcon>
                    <M3ListItemText>{item.text}</M3ListItemText>
                  </M3ListItemButton>
                )}
              </M3NavLink>
            ))}
          </List>
        </React.Fragment>
      ))}
    </>
  );
}
