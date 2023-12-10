
const { MongoClient } = require('mongodb');

async function mongo_client() {

     try{
          const urlstr = process.env.MONGODB_CONSTR;
          const client = new MongoClient(urlstr); 
          await client.connect();

          console.log("Mongodb connection established successfully")
          return client.db("Robotics");
          
     } catch (error) {
          console.error("MongoDB connection error: ", error);
     }

}

module.exports = { mongo_client };

