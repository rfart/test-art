import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const FlightList = () => {
  const location = useLocation();
  const { origin, destination, departureDate, returnDate } = location.state;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError(null);

        // Send request to backend server
        const response = await axios.post("/api/flights", {
          origin,
          destination,
          departureDate,
          returnDate,
        });

        setFlights(response.data); // Update flight state with response data
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Error fetching flights");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFlights();
  }, [origin, destination, departureDate, returnDate]);

  return (
    <div className="flight-list">
      <h2>Available Flights</h2>

      {loading && <p>Loading flights...</p>}
      {error && <p>{error}</p>}

      {!loading && flights.length === 0 && !error && (
        <p>No flights found for your search.</p>
      )}

      {!loading && flights.length > 0 && (
        <ul>
          {flights.map((flight, index) => (
            <li key={index}>
              <Link to={`/flights/${index}`} state={{ flight }}>
                {flight.owner.name} - {flight.base_amount} + {flight.tax_amount}{" "}
                {flight.total_currency}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightList;
