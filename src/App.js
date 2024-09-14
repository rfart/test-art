import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import FlightList from "./components/FlightList";
import FlightDetails from "./components/FlightDetails";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/flights" element={<FlightList />} />
          <Route path="/flights/:id" element={<FlightDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
