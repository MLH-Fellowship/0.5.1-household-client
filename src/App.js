import React from "react";
import { ToastProvider } from "react-toast-notifications";

import Routes from "./routes";

import "./App.css";

const App = () => (
  <div className="App">
    <ToastProvider autoDismiss={true}>
      <Routes />
      {/* <Button type="primary">Button</Button> */}
    </ToastProvider>
  </div>
);

export default App;
