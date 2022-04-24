import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookIcon from "@mui/icons-material/Book";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PersonIcon from "@mui/icons-material/Person";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Drawer from "@mui/material/Drawer";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DrawerSlice from "../redux/drawerSlice";
import * as DialogSlice from "../redux/dialogSlice";

import "./AppDrawer.css";
import M3TextButton from "./m3/M3TextButton";
import { Divider, DividerProps, List, ListProps, ListItem, ListItemButton, ListItemButtonProps, ListItemIcon, ListItemIconProps, ListItemText, ListItemTextProps, ListSubheader, ListSubheaderProps, Typography } from "@mui/material";

const M3List = styled(List)<ListProps>(({ theme }) => ({
  paddingBottom: 0
}));

const M3Divider = styled(Divider)<DividerProps>(({ theme }) => ({
  marginLeft: "1rem",
  marginRight: "1rem"
}));

const M3ListItemButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  height: "3.5rem",
  borderRadius: "1.75rem"
}));

const M3ListItemIcon = styled(ListItemIcon)<ListItemIconProps>(({ theme }) => ({
  minWidth: "auto",
  marginRight: "0.75rem"
}));

function M3ListSubheader({ children, sx, ...props }: ListSubheaderProps): JSX.Element {
  return (
    <ListSubheader {...props} sx={{
      color: (theme) => theme.palette.onSurfaceVariant.main,
      ...sx
    }}>
      <Typography variant="titleSmall">
        {children}
      </Typography>
    </ListSubheader>
  );
}

function M3ListItemText({ children, ...props }: ListItemTextProps): JSX.Element {
  return (
    <ListItemText {...props}>
      <Typography variant="labelLarge">
        {children}
      </Typography>
    </ListItemText>
  );
}

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
      <M3List subheader={<M3ListSubheader>Esporta</M3ListSubheader>}>
        <M3ListItemButton onClick={() => { showDialog("police"); }}>
          <M3ListItemIcon><LocalPoliceIcon /></M3ListItemIcon>
          <M3ListItemText>Polizia</M3ListItemText>
        </M3ListItemButton>
        <M3ListItemButton onClick={() => { showDialog("istat"); }}>
          <M3ListItemIcon><QueryStatsIcon /></M3ListItemIcon>
          <M3ListItemText>Istat</M3ListItemText>
        </M3ListItemButton>
      </M3List>
      <M3Divider />
      <M3List subheader={<M3ListSubheader>Calcola</M3ListSubheader>}>
        <M3ListItemButton onClick={() => { showDialog("cityTax"); }}>
          <M3ListItemIcon><AttachMoneyIcon /></M3ListItemIcon>
          <M3ListItemText>Tassa di soggiorno</M3ListItemText>
        </M3ListItemButton>
      </M3List>
      <M3Divider />
      <M3List subheader={<M3ListSubheader>Cerca</M3ListSubheader>}>
        <M3ListItemButton onClick={() => { showDialog("findBooking"); }}>
          <M3ListItemIcon><BookIcon /></M3ListItemIcon>
          <M3ListItemText>Prenotazione</M3ListItemText>
        </M3ListItemButton>
        <M3ListItemButton onClick={() => { showDialog("findClient"); }}>
          <M3ListItemIcon><PersonIcon /></M3ListItemIcon>
          <M3ListItemText>Cliente</M3ListItemText>
        </M3ListItemButton>
      </M3List>
    </Drawer>
  );
}
