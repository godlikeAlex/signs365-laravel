import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import App from "./App";
import { store } from "./src/store";
import { createInertiaApp } from "@inertiajs/react";
import { DefaultLayout } from "./Layouts";
import "react-loading-skeleton/dist/skeleton.css";
import "@/src/styles/fonts.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
    let page: any =
      pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}/${name}.tsx`];

    if (name !== "Error") {
      page.default.layout =
        page.default.layout ||
        ((page) => <DefaultLayout>{page}</DefaultLayout>);
    }

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App {...props} />
        </QueryClientProvider>
      </Provider>
    );
  },
  title: (title) => `Signs7 - ${title}`,
});
