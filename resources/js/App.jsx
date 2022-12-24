import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "@/src/components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
