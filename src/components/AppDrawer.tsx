import React from "react";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DrawerSlice from "../redux/drawerSlice";
import * as DialogSlice from "../redux/dialogSlice";

import M3TextButton from "./m3/M3TextButton";
import Menu from "./Menu";

export default function AppDrawer(): JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.drawer.open);
  const theme = useTheme();

  function closeDrawer() {
    dispatch(DrawerSlice.close());
  }

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
          <List sx={{
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem"
          }}>
            <ListItem sx={{ justifyContent: "end" }}>
              <M3TextButton
                iconOnly
                onClick={closeDrawer}
                sx={{
                  color: theme.palette.onSurfaceVariant.main,
                }}
              >
                <ArrowBackIcon />
              </M3TextButton>
            </ListItem>
          </List>
          <Menu lists={[
            {
              subheader: "Esporta",
              items: [
                {
                  text: "Polizia",
                  icon: <LocalPoliceOutlinedIcon />,
                  onClick: () => showDialog("police")
                },
                {
                  text: "Istat",
                  icon: <QueryStatsIcon />,
                  onClick: () => showDialog("istat")
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
