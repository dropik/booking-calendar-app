import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { MenuProps } from "@mui/material/Menu";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import M3Menu from "./m3/M3Menu";
import M3MenuItem from "./m3/M3MenuItem";
import M3ListItemIcon from "./m3/M3ListItemIcon";
import M3ListItemText from "./m3/M3ListItemText";

type MenuItemProps = {
  text: string,
  icon: ReactNode,
  disabled?: boolean
};

type LeafMenuItemProps = MenuItemProps & {
  onClick: (event: React.MouseEvent<HTMLElement>) => void
};

type BranchMenuItemProps = MenuItemProps & NestedMenuExtensionProps;

type NestedMenuExtensionProps = ListNestedMenuExtensionProps | CustomNestedMenuExtensionProps;

type ListNestedMenuExtensionProps = {
  list: (LeafMenuItemProps | BranchMenuItemProps)[]
};

type CustomNestedMenuExtensionProps = {
  children: ReactNode
};

type ListNestedMenuProps = MenuProps & ListNestedMenuExtensionProps;

type CustomNestedMenuProps = MenuProps & CustomNestedMenuExtensionProps;

type NestedMenuProps = ListNestedMenuProps | CustomNestedMenuProps;

type MenuContextProps = {
  onAnyItemClick: () => void,
  anchorEl?: HTMLElement,
  setAnchorEl?: (el: HTMLElement | undefined) => void,
  focusedItemId?: string,
  setFocusedItemId?: (id: string | undefined) => void
};

type MenuRootProps = NestedMenuProps & {
  onAnyItemClick: () => void
};

export const MenuContext = createContext<MenuContextProps>({
  onAnyItemClick: () => void 0
});

export default function Menu({ onAnyItemClick, ...props }: MenuRootProps): JSX.Element {
  const contextValue: MenuContextProps = {
    onAnyItemClick: onAnyItemClick
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <NestedMenu {...props} />
    </MenuContext.Provider>
  );
}

function NestedMenu(props: NestedMenuProps): JSX.Element {
  return ("list" in props) ?
    <ListNestedMenu {...props} /> :
    <M3Menu {...props} />;
}

function ListNestedMenu({ list, open, ...props }: ListNestedMenuProps): JSX.Element {
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

function LeafListItem({ text, icon, disabled, onClick }: LeafMenuItemProps): JSX.Element {
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

function BranchListItem({ text, icon, disabled, ...props}: BranchMenuItemProps): JSX.Element {
  const { anchorEl, setAnchorEl, focusedItemId, setFocusedItemId } = useContext(MenuContext);

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
        PaperProps={{ sx: { pointerEvents: "all" }}}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </>
  );
}
