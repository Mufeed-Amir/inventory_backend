import * as dotenv from 'dotenv';
const express = require('express');

dotenv.config();
const app = express ();
app.use(express.json());

const {fetchUser, createUser,deleteUser,updateUser} = require('./src/api/user')
const {login} = require('./src/api/auth')

const {authorisation, getToken} = require('./src/api/auth')

const {changeHash} =require('./src/api/cred');


// User api endpoints
app.post('/user/create', createUser);
app.get('/user/fetch', authorisation, fetchUser);
app.put('/user/update', authorisation, updateUser);
app.delete('/user/delete', authorisation, deleteUser);

// Authentication api endpoints
app.post('/account/login', login);
app.post('/account/token', getToken);


// Change password endpoint
app.post('/credential/change_password',authorisation,changeHash);


//hosting app to a port
app.listen(process.env.PORT, () => {
     console.log("Server Listening on PORT:", process.env.PORT);
});
