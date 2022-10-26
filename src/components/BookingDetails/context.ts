import { createContext } from "react";

import { ClientData } from "../../api";

export const BookingDetailsContext = createContext<{
  clients: ClientData[]
}>({
  clients: []
});
