import { createContext } from "react";

type ExpandedTileContextType = {
  anchorEl?: HTMLElement,
  anchorElRect?: DOMRect,
  onClose: () => void
}

const ExpandedTileContext = createContext<ExpandedTileContextType>({
  onClose: () => void 0
});

export default ExpandedTileContext;
