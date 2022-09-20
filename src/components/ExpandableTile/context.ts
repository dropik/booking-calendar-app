import { createContext } from "react";

type ExpandableTileContextType = {
  anchorEl?: HTMLElement,
  anchorElRect?: DOMRect,
  onClose: () => void,
  setOpenDetails: (value: boolean) => void,
  headerRef: React.RefObject<HTMLDivElement>
}

const ExpandableTileContext = createContext<ExpandableTileContextType>({
  onClose: () => void 0,
  setOpenDetails: () => void 0,
  headerRef: { current: null }
});

export default ExpandableTileContext;
