import React from "react";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import DownloadDialog from "./DownloadDialog";
import * as Api from "../../api";

export default function IstatDownloadDialog(): JSX.Element {
  return (
    <DownloadDialog
      type="istat"
      onFetchAsync={Api.fetchIstatDataAsync}
      setFilename={(date) => `istat-${date}.pdf`}
      icon={<QueryStatsIcon />}
      title="Scarica dati ISTAT"
    />
  );
}
