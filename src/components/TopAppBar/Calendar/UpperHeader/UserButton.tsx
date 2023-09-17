import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { api } from "../../../../api";
import { useAppDispatch } from "../../../../redux/hooks";
import { logout as dispatchLogout } from "../../../../redux/authSlice";

import M3TextButton from "../../../m3/M3TextButton";
import M3Menu from "../../../m3/M3Menu";
import M3MenuItem from "../../../m3/M3MenuItem";
import M3Skeleton from "../../../m3/M3Skeleton";

export default function UserButton(): JSX.Element {
  const { data: user, isFetching } = api.endpoints.getCurrentUser.useQuery(null);
  const dispatch = useAppDispatch();
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

  return (
    <>
      {!isFetching ? (
        <M3TextButton onClick={openMenu}>
          <Typography variant="titleSmall">{user?.visibleName ?? user?.username ?? ""} - {user?.structure}</Typography>
        </M3TextButton>
      ) : (
        <Typography variant="titleSmall">
          <M3Skeleton variant="text" width="4rem" />
        </Typography>
      )}
      <M3Menu anchorEl={anchorEl} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={open} onClose={closeMenu}>
        <M3MenuItem onClick={logout} sx={{
          pr: "1.5rem",
          pl: "1rem",
        }}>
          <LogoutOutlinedIcon sx={{ mr: "1rem" }} />
          Logout
        </M3MenuItem>
      </M3Menu>
    </>
  );
}
