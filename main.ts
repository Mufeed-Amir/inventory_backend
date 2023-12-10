const express = require('express');
import * as dotenv from 'dotenv';
import {create_user,find_user} from './src/user';
const { mongo_client } = require('./src/mongo_db'); 
const {hashPassword,compare} = require('./src/hash');

dotenv.config();

const app = express ();
app.use(express.json());


// all api endpoint
app.post('/create_user', (req, res) => {
  
  const body= req.body;
  const secret=body["password"];
  
  console.log(body);

  hashPassword(secret).then((result) => {
    body['password']=result;
    console.log("------> ", body);
    create_user(body);
  });

  res.send("User added successfully");
});

//Login endpoint;
app.post('/login', (req, res) => {
  
  const body= req.body;
  const secret=body["password"];
  const email=body["email"];

  find_user(email).then((user_data) => {
   
    const hashed=user_data["password"];

    compare(secret, hashed).then((result) => {
      
      if (result)
      res.send("Logged in successfully");
      else 
      res.send("Incorrect Password")
  
    });

  })

});


/////hosting app to a port

const port = process.env.PORT || 4000;

app.listen(port, () => {
     console.log("Server Listening on PORT:", port);
   });
