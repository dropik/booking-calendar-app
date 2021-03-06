import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import * as TilesSlice from "../../redux/tilesSlice";

import "./TilePartAlert.css";

type Props = {
  personsInRoomType: number[],
  roomType: string,
  tileData: TilesSlice.TileData
}

export default function TilePartAlert({ personsInRoomType, roomType, tileData }: Props): JSX.Element {
  let className = "tile-alert";
  let title = "";

  if (personsInRoomType.includes(tileData.persons)) {
    if (roomType !== tileData.roomType) {
      className += " warning";
      title = "Tipologia della stanza diversa da quella prenotata";
    } else return <></>;
  } else {
    className += " error";
    title = "Usata una stanza con il numero di occupazioni non corretti per questa prenotazione";
  }

  return (
    <span className={className} title={title}>
      <FontAwesomeIcon icon={faTriangleExclamation} />
    </span>
  );
}
