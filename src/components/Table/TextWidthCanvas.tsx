import { css } from "@emotion/css";
import React, { createContext, ReactNode, useRef } from "react";

type Props = {
  children: ReactNode
}

type TableContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export const TableContext = createContext<TableContextType>({
  canvasRef: { current: null }
});

export default function TextWidthCanvas({ children }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={css`
          position: fixed;
          top: -100000px
        `}
      />
      <TableContext.Provider value={{ canvasRef: canvasRef }}>
        {children}
      </TableContext.Provider>
    </>
  );
}
