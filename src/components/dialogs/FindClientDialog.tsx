import React, { memo } from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import FindClientDialogBody from "./FindClientDialogBody";

function FindClientDialog(): JSX.Element {
  return (
    <>
      <DialogHeader title="Cerca Cliente" />
      <FindClientDialogBody />
    </>
  );
}

export default memo(hot(module)(FindClientDialog));
