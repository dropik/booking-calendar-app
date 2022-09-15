import React from "react";
import { useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";

type DetailsCollapseProps = {
  children: React.ReactNode,
  open: boolean,
  onClose: () => void
};

export default function DetailsCollapse({ children, open, onClose }: DetailsCollapseProps): JSX.Element {
  const theme = useTheme();

  return (
    <Collapse in={open} easing={{
      enter: theme.transitions.easing.easeOut,
      exit: theme.transitions.easing.fastOutSlowIn
    }} onExited={() => {
      onClose();
    }}>
      {children}
    </Collapse>
  );
}
