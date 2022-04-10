import React, { ReactNode, useContext } from "react";
import { hot } from "react-hot-loader";

import { DialogContext } from "../Dialog";

type Props = {
  children: ReactNode
};

function Dialog({ children }: Props): JSX.Element {
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

export default hot(module)(Dialog);
