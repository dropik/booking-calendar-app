import React from "react";
import { useTheme } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import DrawerLists from "./DrawerLists";

export default function AppDrawer(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.drawer.open);
  const theme = useTheme();

  function showDialog(dialog: DialogSlice.ZeroParameterDialog) {
    dispatch(DialogSlice.show({ dialogType: dialog }));
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: theme.drawerWidth,
        "& .MuiDrawer-paper": {
          top: "4rem",
          width: theme.drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.surface.main,
          border: "none",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem"
        },
      }}
      SlideProps={{
        easing: theme.transitions.easing.fastOutSlowIn
      }}
      transitionDuration={theme.transitions.duration.long}
    >
      <Fade in={open} mountOnEnter unmountOnExit easing={theme.transitions.easing.fastOutSlowIn} timeout={theme.transitions.duration.long}>
        <Box>
          <DrawerLists lists={[
            {
              items: [
                {
                  text: "Calendario",
                  icon: <CalendarMonthOutlinedIcon />,
                  onClick: () => void 0,
                  selected: true
                }
              ]
            },
            {
              subheader: "Calcola",
              items: [
                {
                  text: "Tassa di soggiorno",
                  icon: <AttachMoneyIcon />,
                  onClick: () => showDialog("cityTax")
                }
              ]
            },
            {
              subheader: "Cerca",
              items: [
                {
                  text: "Prenotazione",
                  icon: <BookOutlinedIcon />,
                  onClick: () => showDialog("findBooking")
                },
                {
                  text: "Cliente",
                  icon: <PersonOutlinedIcon />,
                  onClick: () => showDialog("findClient")
                }
              ]
            }
          ]} />
        </Box>
      </Fade>
    </Drawer>
  );
}
