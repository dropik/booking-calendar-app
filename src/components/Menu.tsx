import React, { createContext, ReactNode, useContext } from "react";
import { MenuProps } from "@mui/material/Menu";

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
  onAnyItemClick: () => void
};

type MenuRootProps = NestedMenuProps & MenuContextProps;

const MenuContext = createContext<MenuContextProps>({
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

function ListNestedMenu({ list, ...props }: ListNestedMenuProps): JSX.Element {
  return (
    <M3Menu {...props}>
      {list.map((item) => {
        return ("onClick" in item) ?
          <LeafListItem {...item} key={item.text} /> :
          <BranchListItem {...item} key={item.text} />;
      })}
    </M3Menu>
  );
}

function LeafListItem({ text, icon, disabled, onClick }: LeafMenuItemProps): JSX.Element {
  const { onAnyItemClick } = useContext(MenuContext);

  return(
    <M3MenuItem
      disabled={disabled}
      onClick={(event) => {
        onClick(event);
        onAnyItemClick();
      }}
    >
      <M3ListItemIcon>{icon}</M3ListItemIcon>
      <M3ListItemText>{text}</M3ListItemText>
    </M3MenuItem>
  );
}

function BranchListItem({ text, icon, disabled, ...props}: BranchMenuItemProps): JSX.Element {
  return (
    <>
      <M3MenuItem
        disabled={disabled}
      >
        <M3ListItemIcon>{icon}</M3ListItemIcon>
        <M3ListItemText>{text}</M3ListItemText>
      </M3MenuItem>
    </>
  );
}
