import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

import * as Utils from "../../utils";

type Props = {
  data: {
    id: string,
    type: string,
    entity: string,
    from: string,
    to: string,
    roomNumber?: number
  },
  children: ReactNode
};

function RoomContainer(props: Props): JSX.Element {
  const assigned = props.data.roomNumber === undefined ?
    "Non assegnata" :
    `Camera ${props.data.roomNumber}`;

  return (
    <div className="room-container">
      <h4>{Utils.getFullRoomType(props.data.entity, props.data.type)}</h4>
      <div className="room-info">
        ({new Date(props.data.from).toLocaleDateString()} - {new Date(props.data.to).toLocaleDateString()}) -&nbsp;
        {assigned}
      </div>
      {props.children}
    </div>
  );
}

export default hot(module)(RoomContainer);
