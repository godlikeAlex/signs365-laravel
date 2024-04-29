import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import App from "./App";
import { store } from "./src/store";
import { createInertiaApp } from "@inertiajs/react";
import { DefaultLayout } from "./Layouts";
import "react-loading-skeleton/dist/skeleton.css";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import route from "ziggy-js";
import { Ziggy } from "@/ziggy";

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
      let page: any = pages[`./Pages/${name}.tsx`];
      page.default.layout =
        page.default.layout ||
        ((page) => <DefaultLayout>{page}</DefaultLayout>);

      return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
      global.route = (name, params, absolute, config = Ziggy) =>
        route(name, params, absolute, config);

      return (
        <Provider store={store}>
          <App {...props} />
        </Provider>
      );
    },
  })
);
