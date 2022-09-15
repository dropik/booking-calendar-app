import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";

import ExpandedTileContext from "../context";

type DetailsCollapseProps = {
  children: React.ReactNode,
  open: boolean,
};

export default function DetailsCollapse({ children, open }: DetailsCollapseProps): JSX.Element {
  const { onClose } = useContext(ExpandedTileContext);
  const theme = useTheme();

  return (
    <Collapse in={open} easing={{
      enter: theme.transitions.easing.easeOut,
      exit: theme.transitions.easing.fastOutSlowIn
    }} onExited={() => { onClose(); }}>
      {children}
    </Collapse>
  );
}
