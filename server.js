const axios = require('axios');
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {json}=require("body-parser");
const app = express();

// Load environment variables
dotenv.config();
// Configuration 
app.use(cors());
app.use(json());
const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/resources/image`;
const auth={
    username:process.env.API_KEY,
    password:process.env.API_SECRET 
};
app.get("/nase-prace", async (req, res)=>{
  const response = await axios.get(BASE_URL, {
      auth,
      params: {
          next_cursor: req.query.next_cursor,
      },
  });
    return res.send(response.data)
});
const PORT = process.env.PORT || 7000;
app.listen(PORT);
console.log(`started on ${PORT}`);