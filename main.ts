import * as dotenv from 'dotenv'
const express = require('express');

const app = express ();
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 4000;

app.get('/fetch', (request, response) => {
  
     response.send("HI Its meee...n");
  });

app.listen(port, () => {
     console.log("Server Listening on PORT:", port);
   });
