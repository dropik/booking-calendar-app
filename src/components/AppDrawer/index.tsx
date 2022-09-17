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
        easing: theme.transitions.easing.fastOutSlowIn
      }}
      transitionDuration={theme.transitions.duration.long}
      PaperProps={{
        sx: {
          top: "10.5rem",
          width: "5rem",
          boxSizing: "border-box",
          backgroundColor: theme.palette.surface.main,
          border: "none",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",
          transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.fastOutSlowIn,
            duration: theme.transitions.duration.long
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
                link: "/",
                end: true,
                icon: <CalendarMonthOutlinedIcon />,
                onClick: () => void 0
              },
              {
                text: "Trova prenotazione",
                link: "/bookings",
                end: false,
                icon: <BookmarkBorderOutlinedIcon />,
                onClick: () => void 0
              },
              {
                text: "Strumenti",
                link: "/tools",
                end: true,
                icon: <CreateOutlinedIcon />,
                onClick: () => void 0
              },
              {
                text: "Trova cliente",
                link: "/clients",
                end: true,
                icon: <PersonOutlineOutlinedIcon />,
                onClick: () => void 0
              }
            ]
          }
        ]} />
      </Box>
    </Drawer>
  );
}
