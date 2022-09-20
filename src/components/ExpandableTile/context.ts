import { createContext } from "react";

type ExpandableTileContextType = {
  anchorEl?: HTMLElement,
  anchorElRect?: DOMRect,
  onClose?: () => void,
  setOpenDetails: (value: boolean) => void,
  headerRef: React.RefObject<HTMLDivElement>
}

const ExpandableTileContext = createContext<ExpandableTileContextType>({
  setOpenDetails: () => void 0,
  headerRef: { current: null }
});

export default ExpandableTileContext;
