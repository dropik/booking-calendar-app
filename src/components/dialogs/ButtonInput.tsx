import React, { ReactNode } from "react";

type Props = {
  children: ReactNode,
  className?: string,
  onClick: () => void
};

export default function ButtonInput({ children, className, onClick }: Props): JSX.Element {
  return (
    <div className={`button ${className ? className : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}
