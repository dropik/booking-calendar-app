import { createContext } from "react";

import { Client } from "../../api";

export const BookingDetailsContext = createContext<{
  clients: Client[]
}>({
  clients: []
});
