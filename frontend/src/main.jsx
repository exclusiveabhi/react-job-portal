import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//Authorized nhi hai toh different page pr redirect kr do!
export const Context = createContext({ isAuthorized: false }); //isAuthorized initally false!

const AppWrapper = () => {
  const [isAuthorized, setisAuthorized] = useState(false);
  const [user, setuser] = useState({});
  return (
    <Context.Provider value={{ isAuthorized, setisAuthorized, user, setuser }}>
      <App></App>
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper></AppWrapper>
  </React.StrictMode>
);
