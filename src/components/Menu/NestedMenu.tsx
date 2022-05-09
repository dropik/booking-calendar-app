import React, { useState } from "react";

import { CustomNestedMenuProps } from "./BranchListItem";
import { ListNestedMenuProps } from "./ListNestedMenu";

import NestedMenuSwitch from "./NestedMenuSwitch";

export type NestedMenuProps = ListNestedMenuProps | CustomNestedMenuProps;

export default function NestedMenu({ TransitionProps, sx, ...props }: NestedMenuProps): JSX.Element {
  const [isInTransition, setIsInTransition] = useState(false);

  function startTransition() {
    setIsInTransition(true);
  }

  function endTransition() {
    setIsInTransition(false);
  }

  return (
    <NestedMenuSwitch
      {...props}
      TransitionProps={{
        ...TransitionProps,
        onEntering: startTransition,
        onEntered: endTransition,
        onExiting: startTransition,
        onExited: endTransition
      }}
      sx={{
        ...sx,
        "& .MuiMenu-paper": {
          ...(isInTransition && {
            pointerEvents: "none"
          })
        }
      }}
    />
  );
}
