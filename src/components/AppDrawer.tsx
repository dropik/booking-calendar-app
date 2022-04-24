import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Drawer from "@mui/material/Drawer";
import Divider, { DividerProps } from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import ListItemIcon, { ListItemIconProps } from "@mui/material/ListItemIcon";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import ListSubheader, { ListSubheaderProps } from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DrawerSlice from "../redux/drawerSlice";
import * as DialogSlice from "../redux/dialogSlice";

import M3TextButton from "./m3/M3TextButton";
import StateLayer from "./m3/StateLayer";

const M3Divider = styled(Divider)<DividerProps>(({ theme }) => ({
  marginLeft: "1rem",
  marginRight: "1rem",
  backgroundColor: theme.palette.outline.main
}));

function M3ListItemButton({ sx, children, ...props }: ListItemButtonProps): JSX.Element {
  return (
    <ListItemButton {...props}  sx={{
      paddingTop: 0,
      paddingBottom: 0,
      height: "3.5rem",
      borderRadius: "1.75rem",
      backgroundColor: "transparent",
      "& .state-layer": {
        backgroundColor: (theme) => theme.palette.onSurface.main,
        opacity: 0
      },
      "&:hover": {
        backgroundColor: "transparent",
        "& .state-layer": {
          opacity: (theme) => theme.opacities.hover
        }
      },
      "&:focus-visible,&.Mui-focusVisible": {
        background: "transparent",
        ".state-layer": {
          opacity: (theme) => theme.opacities.focus
        }
      },
      "&:active .state-layer": {
        backgroundColor: (theme) => theme.palette.onSecondaryContainer.main,
        opacity: (theme) => theme.opacities.press
      },
      "&.Mui-selected": {
        backgroundColor: (theme) => theme.palette.secondaryContainer.main,
        "& .state-layer": {
          backgroundColor: (theme) => theme.palette.onSecondaryContainer.main
        },
        "&:hover": {
          backgroundColor: (theme) => theme.palette.secondaryContainer.main
        },
        "&.Mui-focusVisible": {
          backgroundColor: (theme) => theme.palette.secondaryContainer.main
        }
      },
      ...sx
    }}>
      <StateLayer />
      {children}
    </ListItemButton>
  );
}

const M3ListItemIcon = styled(ListItemIcon)<ListItemIconProps>(({ theme }) => ({
  minWidth: "auto",
  marginRight: "0.75rem",
  color: theme.palette.onSurfaceVariant.main,
  ".Mui-selected &": {
    color: theme.palette.onSecondaryContainer.main
  }
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

function M3ListItemText({ children, sx, ...props }: ListItemTextProps): JSX.Element {
  return (
    <ListItemText {...props} sx={{
      color: (theme) => theme.palette.onSurfaceVariant.main,
      ".Mui-selected &": {
        color: (theme) => theme.palette.onSecondaryContainer.main
      },
      ...sx
    }}>
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
