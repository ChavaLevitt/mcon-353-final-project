import logo from "../../logo.svg";
import "./App.css";
import { Home } from "../home/home";
import { React, useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Pinned } from "../pinned/pinned";
import { ParkInfo } from "../parkInfo/parkInfo";

function App() {
  const [pinnedParks, setPinnedParks] = useState([]);

  const addPinnedParks = (park) => {
    const newPinned = [...pinnedParks, { park }];
    {
      console.log("added!");
      console.log(pinnedParks);
    }
    setPinnedParks(newPinned);
  };

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home addPinnedParks={addPinnedParks} />}
        ></Route>
        <Route
          path="/pinned"
          element={
            <Pinned pinnedParks={pinnedParks} addPinnedParks={addPinnedParks} />
          }
        />
        <Route
          path="/parkInfo/:parkCode"
          element={<ParkInfo addPinnedParks={addPinnedParks} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
