import { createContext } from "react";

import { ClientShortData } from "../../../../api";

const ClientContext = createContext<ClientShortData>({
  id: "",
  bookingId: "",
  name: "",
  surname: "",
  dateOfBirth: ""
});

export default ClientContext;
