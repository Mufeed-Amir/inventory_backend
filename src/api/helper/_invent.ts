
const { mongo_client } = require('./mongo_db');
import { ObjectId } from 'mongodb';
import { get_stock, update_stock } from './_stock';


export async function get_item(_item_id: string) {
   
     const client = await mongo_client();
     const collection = client.collection('inventory');

     return await collection.findOne({ _id: new ObjectId(_item_id) });
}

export async function get_user_inventory(_user_id: string) {
     
     const client = await mongo_client();
     const collection = client.collection('inventory');
     
     const _data = await collection.find({ user_id: _user_id }).toArray();

     return _data
}

export async function remove_item(_item_id: string) {

     const client = await mongo_client();
     const collection = client.collection('inventory');

     await collection.deleteOne({ _id: new ObjectId(_item_id) });

     return true;

}

export async function update_item(_item_id: string, updated_count: number) {
     
     const client = await mongo_client();
     const collection = client.collection('inventory');

     await collection.updateOne({ _id: new ObjectId(_item_id) }, { $set: { count: updated_count } });

     return true;
}

export async function issue_helper(_user_id : string , _stock_id :string) {

     const client = await mongo_client();
     const collection = client.collection('inventory');

     return await collection.findOne({user_id : _user_id, stock_id : _stock_id});
}


export async function issue_item(_user_id: string, _stock_id: string, _count: number) {

     const client = await mongo_client();
     const collection = client.collection('inventory');

     const stock_data = await get_stock(_stock_id);

     const _available = stock_data["available"];

     if (_available < _count)
          throw new Error("Can't issue more than available");

     stock_data["available"] = _available - _count;
     stock_data["distributed"] += _count;
     await update_stock(_stock_id, stock_data);

     const existing_item = await issue_helper(_user_id,_stock_id);

     if(existing_item){

          const item_id = existing_item["_id"].toString()
          const updated_count = existing_item["count"] + _count;

          update_item(item_id, updated_count)

          return item_id
     }

     const new_item = await collection.insertOne({
          user_id: _user_id,
          stock_id: _stock_id,
          count: _count,
     });

     return new_item.insertedId
}

export async function return_item(_item_id: string, _count: number) {
     
          const existing_item = await get_item(_item_id);

          if(!existing_item)
               throw new Error("This item is not under issued");

          const remain_count = existing_item["count"] - _count;

          if (remain_count < 0)
               throw new Error("Cant return more than issued")

          else if (remain_count === 0)
               remove_item(_item_id)
          else
               update_item(_item_id, remain_count)


          const stock_data = await get_stock(existing_item["stock_id"]);
          stock_data["available"]   += _count;
          stock_data["distributed"] -= _count;
          
          await update_stock(existing_item["stock_id"], stock_data);
     
          console.log("Item reutrn successfully")

          return true;
}

