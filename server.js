const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post("/api/flights", async (req, res) => {
  try {
    const { origin, destination, departureDate, returnDate } = req.body;
    const response = await axios.post(
      "https://api.duffel.com/air/offer_requests?return_offers=true&supplier_timeout=10000",
      {
        data: {
          slices: [
            {
              origin,
              destination,
              departure_date: departureDate,
            },
            {
              origin: destination,
              destination: origin,
              departure_date: returnDate,
            },
          ],
          passengers: [{ type: "adult" }],
        },
      },
      {
        headers: {
          "Accept-Encoding": "gzip",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Duffel-Version": "v2",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data.data.offers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching flights");
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
