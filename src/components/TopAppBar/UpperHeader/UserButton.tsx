import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { api } from "../../../api";
import { useAppDispatch } from "../../../redux/hooks";
import { logout as dispatchLogout } from "../../../redux/authSlice";

import M3TextButton from "../../m3/M3TextButton";
import M3Menu from "../../m3/M3Menu";
import M3Skeleton from "../../m3/M3Skeleton";
import M3IconButton from "../../m3/M3IconButton";

export default function UserButton(): JSX.Element {
  const { data: user, isFetching } = api.endpoints.getCurrentUser.useQuery(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  function openMenu(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu(): void {
    setAnchorEl(null);
  }

  function logout(): void {
    dispatch(dispatchLogout());
    closeMenu();
    window.location.href = "/login";
  }

  function openSettings(): void {
    navigate("/app/settings");
  }

  return (
    <>
      {!isFetching ? (
        <M3IconButton onClick={openMenu}>
          <AccountCircleOutlinedIcon />
        </M3IconButton>
      ) : (
        <Typography variant="titleSmall">
          <M3Skeleton variant="text" width="2rem" />
        </Typography>
      )}
      <M3Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{ sx: {
          minWidth: "20rem",
          maxWidth: "20rem",
          minHeight: "10rem",
        }}}
        MenuListProps={{ sx: {
          p: "1rem",
          boxSizing: "border-box",
          display: "flex",
          minWidth: "20rem",
          minHeight: "10rem",
          flexDirection: "column",
          justifyContent: "space-between"
        } }}>
        <Stack spacing={0}>
          <Typography variant="displaySmall">{user?.visibleName ?? user?.username ?? ""}</Typography>
          <Typography variant="titleMedium">{user?.structure}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
          <M3IconButton onClick={openSettings}>
            <SettingsOutlinedIcon />
          </M3IconButton>
          <M3TextButton onClick={logout} startIcon={<LogoutOutlinedIcon />}>Logout</M3TextButton>
        </Stack>
      </M3Menu>
    </>
  );
}
