import React, { ReactNode } from "react";
import { MenuProps } from "@mui/material/Menu";

import M3Menu from "./m3/M3Menu";
import M3MenuItem from "./m3/M3MenuItem";
import M3ListItemIcon from "./m3/M3ListItemIcon";
import M3ListItemText from "./m3/M3ListItemText";

type ListItemProps = {
  text: string,
  icon: ReactNode,
  disabled?: boolean
};

type LeafListItemProps = ListItemProps & {
  onClick: (event: React.MouseEvent<HTMLElement>) => void,
  onAnyItemClick: () => void
};

type NestedListItemProps = LeafListItemProps | (ListItemProps & {
  list: NestedListItemProps[]
});

type BranchListItemProps = Exclude<NestedListItemProps, LeafListItemProps>;

interface Props extends MenuProps {
  onAnyItemClick: () => void;
  list: NestedListItemProps[];
}

export default function Menu({ list, onAnyItemClick, ...props }: Props): JSX.Element {
  return (
    <M3Menu {...props}>
      {list.map((item) => {
        if ("onClick" in item) {
          return (
            <LeafListItem {...item} key={item.text} onAnyItemClick={onAnyItemClick} />
          );
        } else {
          return (
            <BranchListItem {...item} key={item.text} />
          );
        }
      })}
    </M3Menu>
  );
}

function LeafListItem({ text, icon, disabled, onClick, onAnyItemClick }: LeafListItemProps): JSX.Element {
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

function BranchListItem({ text, icon, disabled, list}: BranchListItemProps): JSX.Element {
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
