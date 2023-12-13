
const { mongo_client } = require('./mongo_db');
import { ObjectId } from 'mongodb';


export async function add_stock( _name: string , _count : number) {

     const client = await mongo_client();
     const collection = client.collection('stocks');
     
     const stock_data ={ name  : _name,
                         count : Number(_count),
                         available : Number(_count),
                         distributed : 0
                         };

     const stock = await collection.insertOne(stock_data);

     return stock.insertedId;
}


export async function get_stock( stock_id: string) {

     const client = await mongo_client();
     const collection = client.collection('stocks');

     return await collection.findOne({ _id  : new ObjectId(stock_id)});
}


export async function remove_stock( stock_id: string) {

     const client = await mongo_client();
     const collection = client.collection('stocks');

     await collection.deleteOne({ _id  : new ObjectId(stock_id)});

     return true;
}

export async function update_stock( stock_id: string, data : object) {


     const client = await mongo_client();
     const collection = client.collection('stocks');

     await collection.updateOne({ _id  : new ObjectId(stock_id)},[{ $set: data }]);
     
     return true;
}