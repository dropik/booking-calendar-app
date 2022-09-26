import React, { ReactNode, useContext } from "react";

import { MenuContext } from ".";

import M3ListItemIcon from "../m3/M3ListItemIcon";
import M3ListItemText from "../m3/M3ListItemText";
import M3MenuItem from "../m3/M3MenuItem";

export type MenuItemProps = {
  text: string,
  icon: ReactNode,
  disabled?: boolean
};

export type LeafMenuItemProps = MenuItemProps & {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
};

export default function LeafListItem({ text, icon, disabled, onClick }: LeafMenuItemProps): JSX.Element {
  const { onAnyItemClick, setAnchorEl, setFocusedItemId } = useContext(MenuContext);

  return(
    <M3MenuItem
      disabled={disabled}
      onClick={(event) => {
        onClick(event);
        onAnyItemClick();
      }}
      onMouseEnter={() => {
        setAnchorEl?.(undefined);
        setFocusedItemId?.(text);
      }}
    >
      <M3ListItemIcon sx={{ flexBasis: "1.5rem", flexGrow: 0 }}>{icon}</M3ListItemIcon>
      <M3ListItemText sx={{ flexGrow: 1, mr: "0.75rem" }}>{text}</M3ListItemText>
      <M3ListItemIcon sx={{ flexBasis: "1.5rem", flexGrow: 1, mr: 0 }} />
    </M3MenuItem>
  );
}
