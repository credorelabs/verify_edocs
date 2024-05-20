import React from "react";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { Routes, routes } from "./routes";

const AppContainer = (): React.ReactElement => {

  return (
    <div className="flex flex-col min-h-full bg-cover">
      <NavigationBar/>
        <Routes routes={routes} />
      <Footer />
      {/* <Overlay /> */}
    </div>
  );
};

export default AppContainer;
