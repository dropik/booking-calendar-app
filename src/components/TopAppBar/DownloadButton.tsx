import React, { useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import DownloadMenu from "../Menu/DownloadMenu";
import M3IconButton from "../m3/M3IconButton";

export default function DownloadButton(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  function close() {
    setAnchorEl(null);
  }

  return (
    <div>
      <M3IconButton
        focused={open}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <FileDownloadOutlinedIcon />
      </M3IconButton>
      <DownloadMenu anchorEl={anchorEl} onClose={close} />
    </div>
  );
}
