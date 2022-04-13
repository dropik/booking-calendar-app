import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

type Props = {
  children: ReactNode,
  className?: string,
  onClick: () => void
};

function ButtonInput({ children, className, onClick }: Props): JSX.Element {
  return (
    <div className={`button ${className ? className : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default hot(module)(ButtonInput);
