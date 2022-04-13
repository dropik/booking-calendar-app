import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

import * as Utils from "../../utils";

type Props = {
  children: ReactNode,
  data: {
    id: string,
    type: string,
    entity: string,
    from: string,
    to: string,
    roomNumber?: number
  }
};

function RoomContainer({ children, data }: Props): JSX.Element {
  const assigned = data.roomNumber === undefined ?
    "Non assegnata" :
    `Camera ${data.roomNumber}`;

  return (
    <div className="room-container">
      <h4>{Utils.getFullRoomType(data.entity, data.type)}</h4>
      <div className="room-info">
        ({new Date(data.from).toLocaleDateString()} - {new Date(data.to).toLocaleDateString()}) -&nbsp;
        {assigned}
      </div>
      {children}
    </div>
  );
}

export default hot(module)(RoomContainer);
