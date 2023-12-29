// pages/api/omdb.js
// pages/api/omdb.js

export default async function handler(req, res) {
    const { t: title, y: year } = req.query;
    const omdbApiKey = process.env.OMDB_API_KEY; // Ensure this is set in your environment variables
  
    // Construct the OMDB API URL
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${encodeURIComponent(year)}&apikey=${omdbApiKey}`;
  
    console.log(url); // Log the constructed URL
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "Failed to fetch data from OMDB API" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
  
