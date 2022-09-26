import React, { createContext } from "react";

import NestedMenu, { NestedMenuProps } from "./NestedMenu";

export type MenuContextProps = {
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
