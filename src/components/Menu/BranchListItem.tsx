import React, { ReactNode, useContext, useState } from "react";
import { MenuProps } from "@mui/material/Menu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { MenuContext } from ".";
import { ListNestedMenuExtensionProps } from "./ListNestedMenu";
import { MenuItemProps } from "./LeafListItem";

import M3ListItemIcon from "../m3/M3ListItemIcon";
import M3ListItemText from "../m3/M3ListItemText";
import M3MenuItem from "../m3/M3MenuItem";
import NestedMenu from "./NestedMenu";

type CustomNestedMenuExtensionProps = {
  children: ReactNode
};

export type CustomNestedMenuProps = MenuProps & CustomNestedMenuExtensionProps;

type NestedMenuExtensionProps = ListNestedMenuExtensionProps | CustomNestedMenuExtensionProps;

export type BranchMenuItemProps = MenuItemProps & NestedMenuExtensionProps;

export default function BranchListItem({ text, icon, disabled, ...props}: BranchMenuItemProps): JSX.Element {
  const { anchorEl, setAnchorEl, focusedItemId, setFocusedItemId } = useContext(MenuContext);
  const [menuRef, setMenuRef] = useState<HTMLElement | null>(null);

  const openOnLeft = menuRef && anchorEl && ((document.body.clientWidth - anchorEl.getBoundingClientRect().right - 16) < menuRef.clientWidth);
  const anchorOriginHorizontal = openOnLeft ? "left" : "right";
  const transforOriginHorizontal = openOnLeft ? "right" : "left";

  const open = Boolean(anchorEl) && (focusedItemId === text);
  const id = open ? text : undefined;

  function openSubmenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl?.(event.currentTarget);
    setFocusedItemId?.(text);
  }

  return (
    <>
      <M3MenuItem
        disabled={disabled}
        onMouseEnter={openSubmenu}
      >
        <M3ListItemIcon sx={{ flexBasis: "1.5rem", flexGrow: 0 }}>{icon}</M3ListItemIcon>
        <M3ListItemText sx={{ flexGrow: 1, mr: "0.75rem" }}>{text}</M3ListItemText>
        <M3ListItemIcon sx={{ flexBasis: "1.5rem", flexGrow: 0, mr: 0 }}><ArrowRightIcon /></M3ListItemIcon>
      </M3MenuItem>
      <NestedMenu
        {...props}
        id={id}
        anchorEl={anchorEl}
        open={open}
        sx={{ pointerEvents: "none" }}
        PaperProps={{ ref: setMenuRef, sx: { pointerEvents: "all" } }}
        anchorOrigin={{ vertical: "top", horizontal: anchorOriginHorizontal }}
        transformOrigin={{ vertical: "top", horizontal: transforOriginHorizontal }}
      />
    </>
  );
}
