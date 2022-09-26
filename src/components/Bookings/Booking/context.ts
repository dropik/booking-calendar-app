import { createContext } from "react";

import { BookingShortData } from "../../../api";

const BookingContext = createContext<BookingShortData>({
  id: "",
  name: "",
  from: "",
  to: "",
  occupations: 0,
  color: "booking1"
});

export default BookingContext;
