import * as dotenv from 'dotenv';
const express = require('express');

dotenv.config();
const app = express ();
app.use(express.json());

const {fetchUser, createUser,deleteUser,updateUser} = require('./src/api/user')
const {login} = require('./src/api/auth')

const {authorisation, getToken} = require('./src/api/auth')

const {changeHash} =require('./src/api/cred');

const {addStock,getStock,removeStock,updateStock} = require('./src/api/stock');

const {issueItem ,returnItem} =require('./src/api/invent');


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

// stocks api endpoints
app.post('/stock',addStock);
app.get('/stock/:stockId',getStock);
app.delete('/stock/:stockId',removeStock)
app.put('/stock/:stockId',updateStock)


// Inventory api endpoints
app.post('/inventory/:stockId/:quantity',authorisation,issueItem);
app.put('/inventory/:itemId/:quantity',authorisation,returnItem);

// hosting app to a ports
app.listen(process.env.PORT, () => {
     console.log("Server Listening on PORT:", process.env.PORT);
});
