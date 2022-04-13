import logo from "../../logo.svg";
import "./App.css";
import { Home } from "../home/home";

import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "../header/header";
import { Pinned } from "../pinned/pinned";
import { ParkInfo } from "../parkInfo/parkInfo";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pinned" element={<Pinned />} />
        <Route path="/parkInfo/:parkCode" element={<ParkInfo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
