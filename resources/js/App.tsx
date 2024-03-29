import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Menu, Routing } from "./src/components";
import { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch } from "./src/hooks";
import "react-toastify/dist/ReactToastify.css";
import { getUserByToken } from "./src/redux/authSlice";
import { Sugar } from "react-preloaders";
import { initCart } from "./src/redux/cartSlice";
import { getCategoriesWithProducts } from "./src/redux/appSlice";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(getUserByToken()).unwrap();
      } catch (error) {
        console.log(error);
      }
      await dispatch(getCategoriesWithProducts()).unwrap();
      await dispatch(initCart()).unwrap();

      setAppLoaded(true);
    };

    initApp();
  }, []);

  return (
    <>
      <BrowserRouter>{appLoaded ? <Routing /> : null}</BrowserRouter>

      {/* <Sugar customLoading={!appLoaded} /> */}

      <ToastContainer />
    </>
  );
}

export default App;
