import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import itLocale from "date-fns/locale/it";

import { store } from "./redux/store";

import App from "./App";

render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
      <App />
    </LocalizationProvider>
  </Provider>,
  document.getElementById("root")
);
