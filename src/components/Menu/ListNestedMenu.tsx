import React, { useContext, useEffect, useState } from "react";
import { MenuProps } from "@mui/material/Menu";

import { MenuContext, MenuContextProps } from ".";

import M3Menu from "../m3/M3Menu";
import LeafListItem, { LeafMenuItemProps } from "./LeafListItem";
import BranchListItem, { BranchMenuItemProps } from "./BranchListItem";

export type ListNestedMenuExtensionProps = {
  list: (LeafMenuItemProps | BranchMenuItemProps)[]
};

export type ListNestedMenuProps = MenuProps & ListNestedMenuExtensionProps;

export default function ListNestedMenu({ list, open, ...props }: ListNestedMenuProps): JSX.Element {
  const context = useContext(MenuContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const [focusedItemId, setFocusedItemId] = useState<string>();

  const newContext: MenuContextProps = {
    onAnyItemClick: context.onAnyItemClick,
    anchorEl: anchorEl,
    setAnchorEl: setAnchorEl,
    focusedItemId: focusedItemId,
    setFocusedItemId: setFocusedItemId
  };

  useEffect(() => {
    if (!open) {
      setAnchorEl(undefined);
    }
  }, [open]);

  return (
    <MenuContext.Provider value={newContext}>
      <M3Menu {...props} open={open}>
        {list.map((item) => {
          return ("onClick" in item) ?
            <LeafListItem {...item} key={item.text} /> :
            <BranchListItem {...item} key={item.text} />;
        })}
      </M3Menu>
    </MenuContext.Provider>
  );
}
