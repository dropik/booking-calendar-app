import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

type Props = {
  children: ReactNode,
  onClick: () => void
};

function ButtonInput({ children, onClick }: Props): JSX.Element {
  return (
    <div className="button" onClick={onClick}>
      {children}
    </div>
  );
}

export default hot(module)(ButtonInput);
