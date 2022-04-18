import React, { memo } from "react";

import DialogHeader from "./DialogHeader";
import FindClientDialogBody from "./FindClientDialogBody";

export default memo(function FindClientDialog(): JSX.Element {
  return (
    <div className="scrollable">
      <DialogHeader>Cerca Cliente</DialogHeader>
      <FindClientDialogBody />
    </div>
  );
});
