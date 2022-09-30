import React, { useContext, useState } from "react";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";

import { TileContext } from "../../Tile/context";

import M3IconButton from "../../m3/M3IconButton";
import TileContextMenu from "../../Menu/TileContextMenu";

export default function MoreButton(): JSX.Element | null {
  const { data } = useContext(TileContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  if (!data) {
    return null;
  }

  function open(event: React.UIEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function close(): void {
    setAnchorEl(undefined);
  }

  return (
    <>
      <M3IconButton focused={Boolean(anchorEl)} onClick={open}><MoreVertOutlined /></M3IconButton>
      <TileContextMenu
        tileId={data.id}
        anchorReference="anchorEl"
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom"
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top"
        }}
        onClose={close}
        unassigned={data.roomId === undefined}
      />
    </>
  );
}
