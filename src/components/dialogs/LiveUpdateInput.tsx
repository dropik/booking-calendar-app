import React, { ReactNode, useContext, useEffect } from "react";
import { hot } from "react-hot-loader";
import { FindBookingDialogContext } from "./FindBookingDialogBody";

type Props<T> = {
  children: ReactNode,
  value: T
};

function LiveUpdateInput<T>({ children, value }: Props<T>): JSX.Element {
  const { enableLiveUpdate } = useContext(FindBookingDialogContext);

  useEffect(() => {
    return enableLiveUpdate;
  }, [enableLiveUpdate, value ]);

  return <>{children}</>;
}

export default hot(module)(LiveUpdateInput);
