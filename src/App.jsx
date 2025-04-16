// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pokemon from "./Pokemon";
import PokemonDetails from "./PokemonDetails";
import FormulaOne from "./FormulaOne";
import PiloteDetails from "./PiloteDetails";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/pilotes" element={<FormulaOne />} />
          <Route path="/pilotes/:id" element={<PiloteDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
