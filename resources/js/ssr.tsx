import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./src/store";
import ReactDOMServer from "react-dom/server";

// const container = document.getElementById("root");
// const root = createRoot(container as HTMLElement);

export default function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  return { html };
}
