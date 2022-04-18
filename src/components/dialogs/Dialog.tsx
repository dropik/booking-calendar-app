import React, { ReactNode, useContext } from "react";

import { DialogContext } from "../Dialog";

type Props = {
  children: ReactNode
};

export default function Dialog({ children }: Props): JSX.Element {
  const context = useContext(DialogContext);

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  let dialogClassName = "dialog";
  if (context.index < context.lastIndex) {
    dialogClassName += " hidden";
  }

  return (
    <div className={dialogClassName} onClick={preventHideOnSelfClick}>
      {children}
    </div>
  );
}
