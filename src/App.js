import React from "react";
import routing, { RoutesArr } from "./routing/Index";
import { ToastContainer } from 'react-toastify';
import { Outlet, Routes } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
   
      <Routes>{routing(RoutesArr)}</Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
