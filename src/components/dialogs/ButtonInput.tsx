import React, { ReactNode, useContext } from "react";
import { hot } from "react-hot-loader";

import { FindBookingDialogContext } from "./FindBookingDialogBody";

type Props = {
  children: ReactNode,
  onClick: () => void
};

function ButtonInput({ children, onClick }: Props): JSX.Element {
  const { enableLiveUpdate } = useContext(FindBookingDialogContext);

  return (
    <div className="button" onClick={() => {
      onClick();
      enableLiveUpdate();
    }}>
      {children}
    </div>
  );
}

export default hot(module)(ButtonInput);
