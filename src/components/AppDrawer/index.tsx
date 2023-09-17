import React from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useAppSelector } from "../../redux/hooks";

import DrawerLists from "./DrawerLists";

export default function AppDrawer(): JSX.Element {
  const open = useAppSelector((state) => state.drawer.open);
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      SlideProps={{
        easing: theme.transitions.easing.emphasized
      }}
      transitionDuration={theme.transitions.duration.long2}
      PaperProps={{
        sx: {
          top: "10.5rem",
          width: "5rem",
          justifyContent: "center",
          height: "calc(100vh - 21rem)",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          border: "none",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",
          transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.emphasized,
            duration: theme.transitions.duration.long2,
          }),
          ...(open && {
            width: theme.drawerWidth
          })
        }
      }}
    >
      <Box>
        <DrawerLists open={open} lists={[
          {
            items: [
              {
                text: "Calendario",
                link: "/app/table",
                end: true,
                icon: <CalendarMonthOutlinedIcon />
              },
              {
                text: "Trova prenotazione",
                link: "/app/bookings",
                end: false,
                icon: <BookmarkBorderOutlinedIcon />
              },
              {
                text: "Strumenti",
                link: "/app/tools",
                end: false,
                icon: <CreateOutlinedIcon />
              },
              {
                text: "Trova cliente",
                link: "/app/clients",
                end: true,
                icon: <PersonOutlineOutlinedIcon />
              },
            ]
          }
        ]} />
      </Box>
    </Drawer>
  );
}
