import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      origin,
      destination,
      departureDate,
      returnDate,
    };
    navigate("/flights", { state: searchParams });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Origin (e.g., MAD)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Destination (e.g., JFK)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        required
      />
      <button type="submit">Search Flights</button>
    </form>
  );
};

export default SearchForm;
