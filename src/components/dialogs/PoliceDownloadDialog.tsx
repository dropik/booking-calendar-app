import React from "react";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";

import * as Api from "../../api";

import DownloadDialog from "./DownloadDialog";

export default function PoliceDownloadDialog(): JSX.Element {
  return (
    <DownloadDialog
      type="police"
      onFetchAsync={Api.fetchPoliceDataAsync}
      setFilename={(date) => `polizia-${date}.txt`}
      icon={<LocalPoliceOutlinedIcon />}
      title="Scarica dati polizia"
    />
  );
}
