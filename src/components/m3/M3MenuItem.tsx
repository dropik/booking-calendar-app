import { alpha, styled } from "@mui/material/styles";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";

const M3MenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  height: "3rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  "& .MuiListItemIcon-root": {
    minWidth: "auto"
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.hover)
  },
  "&:focus-visible, &.Mui-focusVisible": {
    backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.focus)
  },
  "&:active": {
    backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.press)
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, theme.opacities.focus),
    "&:hover": {
      backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.hover)
    },
    "&:focus-visible, &.Mui-focusVisible": {
      backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.focus)
    },
    "&:active": {
      backgroundColor: alpha(theme.palette.onSurface.main, theme.opacities.press)
    }
  }
}));

export default M3MenuItem;
