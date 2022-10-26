import { createContext } from "react";

import { BookingShort } from "../../../api";

const BookingContext = createContext<BookingShort>({
  id: "",
  status: "new",
  name: "",
  lastModified: "",
  from: "",
  to: "",
  occupations: 0,
  color: "booking1"
});

export default BookingContext;
