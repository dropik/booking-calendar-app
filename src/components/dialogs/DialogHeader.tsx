import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  type: DialogSlice.DialogType,
  fadeOutDialog: () => void
};

function DialogHeader(props: Props): JSX.Element {
  let title: string;
  switch (props.type) {
  case "police":
    title = "Esporta Dati Polizia";
    break;
  case "istat":
    title = "Esporta Dati ISTAT";
    break;
  }

  return (
    <>
      <h3>
        {title}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={props.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(DialogHeader);
