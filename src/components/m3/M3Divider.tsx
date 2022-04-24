import { styled } from "@mui/material/styles";
import Divider, { DividerProps } from "@mui/material/Divider";

const M3Divider = styled(Divider)<DividerProps>(({ theme }) => ({
  marginLeft: "1rem",
  marginRight: "1rem",
  backgroundColor: theme.palette.outline.main
}));

export default M3Divider;
