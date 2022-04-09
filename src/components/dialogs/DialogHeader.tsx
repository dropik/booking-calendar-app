import React, { ReactNode, useContext } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import { DialogContext } from "../Dialog";
import { DialogContainerContext } from "./DialogContainer";

type Props = {
  children: ReactNode
};

function DialogHeader(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const dialogContext = useContext(DialogContext);
  const dialogContainerContext = useContext(DialogContainerContext);

  function goBack() {
    dispatch(DialogSlice.goBack());
  }

  const goBackButton = dialogContext.index !== 0 ?
    <FontAwesomeIcon className="button back" icon={faAngleLeft} onClick={goBack} /> :
    <></>;

  return (
    <>
      <h3>
        {goBackButton}
        {props.children}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={dialogContainerContext.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(DialogHeader);
