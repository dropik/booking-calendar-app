import React, { useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import M3TextButton from "../m3/M3TextButton";
import DownloadMenu from "../Menu/DownloadMenu";

export default function DownloadButton(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  function close() {
    setAnchorEl(null);
  }

  return (
    <div>
      <M3TextButton
        iconOnly
        focused={open}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <FileDownloadOutlinedIcon />
      </M3TextButton>
      <DownloadMenu anchorEl={anchorEl} onClose={close} />
    </div>
  );
}
