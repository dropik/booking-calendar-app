import { createContext } from "react";

type ExpandedTileContextType = {
  anchorEl: HTMLElement | null,
  anchorElRect?: DOMRect,
  onClose: () => void
}

const ExpandedTileContext = createContext<ExpandedTileContextType>({
  anchorEl: null,
  onClose: () => void 0
});

export default ExpandedTileContext;
