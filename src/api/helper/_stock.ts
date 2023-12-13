
const { mongo_client } = require('./mongo_db');
import { ObjectId } from 'mongodb';


export async function add_stock( _name: string , _count : number) {
     try {

          const client = await mongo_client();
          const collection = client.collection('stocks');
          
          const stock_data ={ name  : _name,
                              count : Number(_count),
                              available : Number(_count),
                              distributed : 0
                              };

          console.log('stock added successfully');

          return await collection.insertOne(stock_data);

     } catch (error) {
          console.error('Error inserting data:', error);
     }
}


export async function get_stock( stock_id: string) {

     try {
          const client = await mongo_client();
          const collection = client.collection('stocks');

          return await collection.findOne({ _id  : new ObjectId(stock_id)});

     } catch (error) {
          console.error('Error in fetching data:', error);
     }
}


export async function remove_stock( stock_id: string) {
     try {

          const client = await mongo_client();
          const collection = client.collection('stocks');

          return await collection.deleteOne({ _id  : new ObjectId(stock_id)});

     } catch (error) {
          console.error('Error in deleting data:', error);
     }
}


export async function update_stock( stock_id: string, data : object) {

     try {
          const client = await mongo_client();
          const collection = client.collection('stocks');

          return await collection.updateOne({ _id  : new ObjectId(stock_id)},[{ $set: data }]);

     } catch (error) {
          console.error('Error in updating data:', error);
     }
}