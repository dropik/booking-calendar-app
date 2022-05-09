import React from "react";

import { DownloadDialogState } from "./DownloadDialog";

import M3TextButton from "../m3/M3TextButton";

type Props = {
  state: DownloadDialogState,
  onClose: () => void,
  onDownload: () => void
};

export default function DownloadDialogActions({ state, onClose, onDownload }: Props): JSX.Element {
  switch (state) {
  case "fill":
    return (
      <>
        <M3TextButton sx={{ marginRight: "0.5rem" }} onClick={onClose}>Cancella</M3TextButton>
        <M3TextButton onClick={onDownload}>Scarica</M3TextButton>
      </>
    );
  case "loading":
    return <></>;
  case "done":
    return (
      <M3TextButton onClick={onClose}>Ok</M3TextButton>
    );
  }
}
