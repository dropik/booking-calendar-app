import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import * as Api from "../../api";

type Props = {
  data: Api.BookingData,
  fadeOutDialog: () => void
};

function BookingDialogHeader(props: Props): JSX.Element {
  return (
    <>
      <h3>
        {`Prenotazione #${props.data.id} (${props.data.name})`}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={props.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(BookingDialogHeader);
