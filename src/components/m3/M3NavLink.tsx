import { styled } from "@mui/material/styles";
import { NavLink, NavLinkProps } from "react-router-dom";

const M3NavLink = styled(NavLink)<NavLinkProps>(() => ({
  textDecoration: "none"
}));

export default M3NavLink;
