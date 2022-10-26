import { createContext } from "react";

import { Client } from "../../../../api";

const ClientContext = createContext<Client>({
  id: "",
  bookingId: "",
  name: "",
  surname: "",
  dateOfBirth: ""
});

export default ClientContext;
