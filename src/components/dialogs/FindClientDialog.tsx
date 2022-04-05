import React, { memo } from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import FindClientDialogBody from "./FindClientDialogBody";

type Props = {
  showGoBackButton?: boolean,
  fadeOutDialog: () => void
};

function FindClientDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader title="Cerca Cliente" showGoBackButton={props.showGoBackButton} fadeOutDialog={props.fadeOutDialog} />
      <FindClientDialogBody />
    </>
  );
}

export default memo(hot(module)(FindClientDialog));
