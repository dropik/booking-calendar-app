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

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DrawerSlice from "../redux/drawerSlice";
import * as DialogSlice from "../redux/dialogSlice";

import M3TextButton from "./m3/M3TextButton";
import M3Divider from "./m3/M3Divider";
import M3ListItemButton from "./m3/M3ListItemButton";
import M3ListItemIcon from "./m3/M3ListItemIcon";
import M3ListSubheader from "./m3/M3ListSubheader";
import M3ListItemText from "./m3/M3ListItemText";

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
    >
      <List sx={{
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem"
      }}>
        <M3TextButton
          iconOnly
          onClick={closeDrawer}
          sx={{
            color: theme.palette.onSurfaceVariant.main,
            float: "right"
          }}
        >
          <ArrowBackIcon />
        </M3TextButton>
      </List>
      <M3Divider />
      <List subheader={<M3ListSubheader>Esporta</M3ListSubheader>}>
        <M3ListItemButton onClick={() => { showDialog("police"); }}>
          <M3ListItemIcon><LocalPoliceOutlinedIcon /></M3ListItemIcon>
          <M3ListItemText>Polizia</M3ListItemText>
        </M3ListItemButton>
        <M3ListItemButton onClick={() => { showDialog("istat"); }}>
          <M3ListItemIcon><QueryStatsIcon /></M3ListItemIcon>
          <M3ListItemText>Istat</M3ListItemText>
        </M3ListItemButton>
      </List>
      <M3Divider />
      <List subheader={<M3ListSubheader>Calcola</M3ListSubheader>}>
        <M3ListItemButton onClick={() => { showDialog("cityTax"); }}>
          <M3ListItemIcon><AttachMoneyIcon /></M3ListItemIcon>
          <M3ListItemText>Tassa di soggiorno</M3ListItemText>
        </M3ListItemButton>
      </List>
      <M3Divider />
      <List subheader={<M3ListSubheader>Cerca</M3ListSubheader>}>
        <M3ListItemButton onClick={() => { showDialog("findBooking"); }}>
          <M3ListItemIcon><BookOutlinedIcon /></M3ListItemIcon>
          <M3ListItemText>Prenotazione</M3ListItemText>
        </M3ListItemButton>
        <M3ListItemButton onClick={() => { showDialog("findClient"); }}>
          <M3ListItemIcon><PersonOutlinedIcon /></M3ListItemIcon>
          <M3ListItemText>Cliente</M3ListItemText>
        </M3ListItemButton>
      </List>
    </Drawer>
  );
}
