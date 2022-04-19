import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider } from "@mui/material/styles";
import itLocale from "date-fns/locale/it";

import { store } from "./redux/store";
import theme from "./components/m3/theme";

import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </Provider>
);
