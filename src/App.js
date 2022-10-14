import React from "react";
import Routing, { RoutesArr } from "./routing/Index";
import { ToastContainer } from 'react-toastify';
import { Routes } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>{Routing(RoutesArr)}</Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
