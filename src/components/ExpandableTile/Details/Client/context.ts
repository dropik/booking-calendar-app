import { createContext } from "react";

import { ClientData } from "../../../../api";

const ClientContext = createContext<ClientData>({
  id: "",
  bookingId: "",
  name: "",
  surname: "",
  dateOfBirth: ""
});

export default ClientContext;
