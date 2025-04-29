import React from "react";
import Navbar from "./components/Navbar.jsx";
import SideBar from "./components/SideBar.jsx";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <Navbar />
        <hr />
        <div className="flex w-full">
          <SideBar />
        </div>
      </>
    </div>
  );
};

export default App;
