import { styled } from "@mui/material/styles";
import ListItemIcon, { ListItemIconProps } from "@mui/material/ListItemIcon";

const M3ListItemIcon = styled(ListItemIcon)<ListItemIconProps>(({ theme }) => ({
  minWidth: "auto",
  marginRight: "0.75rem",
  color: theme.palette.onSurfaceVariant.main,
  ".Mui-selected &": {
    color: theme.palette.onSecondaryContainer.main
  }
}));

export default M3ListItemIcon;
