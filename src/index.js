import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";

import { DataContextProvider } from "./store/dataContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContextProvider>
    <App />
  </DataContextProvider>
);
