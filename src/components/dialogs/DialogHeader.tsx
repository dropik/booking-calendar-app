import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  title: string,
  fadeOutDialog: () => void
};

function DialogHeader(props: Props): JSX.Element {
  return (
    <>
      <h3>
        {props.title}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={props.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(DialogHeader);
