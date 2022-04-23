import React from "react";
import { styled } from "@mui/material/styles";
import AppBar, { AppBarProps } from "@mui/material/AppBar";

const CustomizedAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.surface.main,
  color: theme.palette.onSurface.main,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: "4rem",
  paddingLeft: "0.5rem",
  paddingRight: "0.5rem"
}));

export default function M3AppBar({ ...props}: AppBarProps): JSX.Element {
  return <CustomizedAppBar elevation={0} {...props} />;
}
