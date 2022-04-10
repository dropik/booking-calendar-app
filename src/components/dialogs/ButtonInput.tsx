import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

import LiveUpdateInput from "./LiveUpdateInput";

type Props = {
  children: ReactNode,
  onClick: () => void
};

function ButtonInput({ children, onClick }: Props): JSX.Element {
  return (
    <LiveUpdateInput>
      <div className="button" onClick={onClick}>
        {children}
      </div>
    </LiveUpdateInput>
  );
}

export default hot(module)(ButtonInput);
