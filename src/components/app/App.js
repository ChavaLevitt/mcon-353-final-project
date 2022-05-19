import logo from "../../logo.svg";
import "./App.css";
import { Home } from "../home/home";
import { React, useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Pinned } from "../pinned/pinned";
import { Search } from "../search/search";
import { ParkInfo } from "../parkInfo/parkInfo";
import { PinsProvider } from "./context";
import { VisitedProvider } from "./visitedContext";
import { SearchProvider } from "./searchContext";
import { ReviewProvider } from "./reviewContext";

function App() {
  return (
    <SearchProvider>
      <PinsProvider>
        <VisitedProvider>
          <ReviewProvider>
            <HashRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Search />}></Route>
                <Route path="/search" element={<Home />}></Route>
                <Route path="/pinned" element={<Pinned />} />
                <Route path="/parkInfo/:parkCode" element={<ParkInfo />} />
              </Routes>
            </HashRouter>
          </ReviewProvider>
        </VisitedProvider>
      </PinsProvider>
    </SearchProvider>
  );
}

export default App;
