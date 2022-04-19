import React, { ReactNode, useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import { DialogContext } from "../Dialog";
import { DialogContainerContext } from "./DialogContainer";

type Props = {
  children: ReactNode
};

export default function DialogHeader({ children }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const dialogContext = useContext(DialogContext);
  const dialogContainerContext = useContext(DialogContainerContext);

  function goBack() {
    dispatch(DialogSlice.goBack());
  }

  const goBackButton = dialogContext.index !== 0 ?
    <ArrowBackIcon className="button back" onClick={goBack} /> :
    <></>;

  return (
    <>
      <h3>
        {goBackButton}
        {children}
        <CloseIcon className="button close" onClick={dialogContainerContext.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}
