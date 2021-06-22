import React from "react";
import { hot } from "react-hot-loader";
import Table from "./table";
import "./app.css";

function App(props) {
  return(
    <div className="app">
      <Table rows="5" columns="6" />
    </div>
  );
}

export default hot(module)(App);
