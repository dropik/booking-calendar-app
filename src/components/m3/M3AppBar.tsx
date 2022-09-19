import React from "react";
import { styled } from "@mui/material/styles";
import AppBar, { AppBarProps } from "@mui/material/AppBar";

const CustomizedAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.surface.main,
  color: theme.palette.onSurface.main,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
}));

export default function M3AppBar({ ...props}: AppBarProps): JSX.Element {
  return <CustomizedAppBar elevation={0} {...props} />;
}
