import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import itLocale from "date-fns/locale/it";

import { store } from "./redux/store";

import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
      <App />
    </LocalizationProvider>
  </Provider>
);
