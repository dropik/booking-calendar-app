import React, { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Fade from "@mui/material/Fade";

import M3ListSubheader from "../m3/M3ListSubheader";
import M3ListItemButton from "../m3/M3ListItemButton";
import M3ListItemIcon from "../m3/M3ListItemIcon";
import M3ListItemText from "../m3/M3ListItemText";
import M3Divider from "../m3/M3Divider";
import M3NavLink from "../m3/M3NavLink";

type Props = {
  open: boolean,
  lists: {
    subheader?: string,
    items: {
      icon: ReactNode,
      text: string,
      link: string,
      end: boolean
    }[]
  }[]
}

export default function DrawerLists({ open, lists }: Props): JSX.Element {
  const theme = useTheme();

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
                  <M3ListItemButton selected={isActive} sx={{
                    overflow: "hidden",
                    transition: theme.transitions.create(["height", "margin-bottom"], {
                      easing: theme.transitions.easing.emphasized,
                      duration: theme.transitions.duration.medium4,
                    }),
                    ...(!open && {
                      height: "2rem",
                      mb: "2rem"
                    })
                  }}>
                    <M3ListItemIcon>{item.icon}</M3ListItemIcon>
                    <Fade in={open} easing={theme.transitions.easing.emphasized}>
                      <Box>
                        <M3ListItemText>{item.text}</M3ListItemText>
                      </Box>
                    </Fade>
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
