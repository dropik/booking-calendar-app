import React, { ReactNode, useContext, useEffect } from "react";
import { hot } from "react-hot-loader";
import { FindBookingDialogContext } from "./FindBookingDialogBody";

type Props = {
  children: ReactNode
};

function LiveUpdateInput({ children }: Props): JSX.Element {
  const { enableLiveUpdate } = useContext(FindBookingDialogContext);

  useEffect(() => {
    return enableLiveUpdate;
  });

  return <>{children}</>;
}

export default hot(module)(LiveUpdateInput);
