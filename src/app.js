import React from "react";
import { hot } from "react-hot-loader";
import Container from "./container.js";
import "./app.css";

function App(props) {
  return(
    <div className="app">
      <Container />
    </div>
  );
}

export default hot(module)(App);
