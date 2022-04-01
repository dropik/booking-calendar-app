import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import * as Api from "../../api";

type Props = {
  data: Api.BookingData | undefined,
  fadeOutDialog: () => void
};

function BookingDialogHeader(props: Props): JSX.Element {
  const bookingDescription = props.data === undefined ? "" : `#${props.data.id} (${props.data.name})`;

  return (
    <>
      <h3>
        {`Prenotazione ${bookingDescription}`}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={props.fadeOutDialog} />
      </h3>
      <hr />
    </>
  );
}

export default hot(module)(BookingDialogHeader);
