import React, { ReactNode, useContext, useEffect } from "react";

import { FindDialogContext } from "./FindDialogBody";

type Props<T> = {
  children: ReactNode,
  value: T
};

export default function LiveUpdateInput<T>({ children, value }: Props<T>): JSX.Element {
  const { enableLiveUpdate } = useContext(FindDialogContext);

  useEffect(() => {
    return enableLiveUpdate;
  }, [enableLiveUpdate, value ]);

  return <>{children}</>;
}
