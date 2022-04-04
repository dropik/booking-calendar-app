import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  title: string,
  showGoBackButton?: boolean,
  fadeOutDialog: () => void
};

function DialogHeader(props: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(DialogSlice.goBack());
  }

  const goBackButton = props.showGoBackButton ?
    <FontAwesomeIcon className="button back" icon={faAngleLeft} onClick={goBack} /> :
    <></>;

  return (
    <>
      <h3>
        {goBackButton}
        {props.title}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={props.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(DialogHeader);
