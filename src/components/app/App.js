import logo from "../../logo.svg";
import "./App.css";
import { Home } from "../home/home";
import { React, useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Pinned } from "../pinned/pinned";
import { ParkInfo } from "../parkInfo/parkInfo";
import { PinsProvider } from "./context";
import { VisitedProvider } from "./visitedContext";

function App() {
  return (
    <PinsProvider>
      <VisitedProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/pinned" element={<Pinned />} />
            <Route path="/parkInfo/:parkCode" element={<ParkInfo />} />
          </Routes>
        </HashRouter>
      </VisitedProvider>
    </PinsProvider>
  );
}

export default App;
