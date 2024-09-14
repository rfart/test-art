import React from "react";
import { useLocation } from "react-router-dom";

const FlightDetails = () => {
  const location = useLocation();
  const { flight } = location.state;

  const firstSlice = flight.slices[0]; // We are only working with slices[0]

  return (
    <div className="flight-details">
      <h2>Flight Details</h2>
      <p>Airline: {flight.owner.name}</p>
      <p>
        Price: {flight.base_amount} + {flight.tax_amount}{" "}
        {flight.total_currency}
      </p>
      {firstSlice.segments.map((segment, segmentIndex) => (
        <div key={segmentIndex}>
          <p>
            From: {segment.origin.city_name} ({segment.origin.iata_code})
          </p>
          <p>
            To: {segment.destination.city_name} ({segment.destination.iata_code}
            )
          </p>
          <p>Departure: {new Date(segment.departing_at).toLocaleString()}</p>
          <p>Arrival: {new Date(segment.arriving_at).toLocaleString()}</p>
          <p>Duration: {segment.duration}</p>
          <p>Aircraft: {segment.aircraft?.name || "Unknown"}</p>
          <br />
          <br />
        </div>
      ))}

      {/* Check if there are more than one segments (indicating a transit) */}
      {firstSlice.segments.length > 1 && (
        <p>This flight has {firstSlice.segments.length - 1} transit stop(s).</p>
      )}
    </div>
  );
};

export default FlightDetails;
