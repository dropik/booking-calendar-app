import React, { useContext } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";
import { DialogContext } from "../DialogContainer";

type Props = {
  title: string
};

function DialogHeader(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const context = useContext(DialogContext);

  function goBack() {
    dispatch(DialogSlice.goBack());
  }

  const goBackButton = context.index !== 0 ?
    <FontAwesomeIcon className="button back" icon={faAngleLeft} onClick={goBack} /> :
    <></>;

  return (
    <>
      <h3>
        {goBackButton}
        {props.title}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={context.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(DialogHeader);
