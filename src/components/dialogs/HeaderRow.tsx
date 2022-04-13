import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

type Props = {
  children: ReactNode
};

function HeaderRow({ children }: Props): JSX.Element {
  return (
    <div className="row list-header">
      {children}
    </div>
  );
}

export default hot(module)(HeaderRow);
