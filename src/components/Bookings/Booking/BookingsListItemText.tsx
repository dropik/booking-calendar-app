import { styled } from "@mui/material/styles";
import { ListItemTextProps } from "@mui/material/ListItemText";

import M3ListItemText from "../../m3/M3ListItemText";

const BookingsListItemText = styled(M3ListItemText)<ListItemTextProps>(() => ({
  marginTop: 0,
  marginBottom: 0
}));

export default BookingsListItemText;
