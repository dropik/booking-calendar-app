import React, { ReactNode } from "react";

type Props = {
  children: ReactNode
};

export default function HeaderRow({ children }: Props): JSX.Element {
  return (
    <div className="row list-header">
      {children}
    </div>
  );
}
