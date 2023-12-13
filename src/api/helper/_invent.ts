
const { mongo_client } = require('./mongo_db');
import { ObjectId } from 'mongodb';
import { get_stock, update_stock } from './_stock';
import { callbackify } from 'util';




export async function get_item( _item_id: string){
     try {

          const client = await mongo_client();
          const collection = client.collection('inventory');

          return await collection.findOne({_id: new ObjectId(_item_id)});

     } catch (error) {
          console.error('Error fetching item:', error);
     }
}

export async function remove_item( _item_id: string) {
     try {

          const client = await mongo_client();
          const collection = client.collection('inventory');

          return await collection.deleteOne({_id: new ObjectId(_item_id)});

     } catch (error) {
          console.error('Error deleting item:', error);
     }
}


export async function update_item( _item_id: string, updated_count: number) {

     try {
          const client = await mongo_client();
          const collection = client.collection('inventory');

          await collection.updateOne({_id: new ObjectId(_item_id)}, { $set: { count: updated_count}});

     } catch (error) {
          console.error('Error fetching item:', error);
     }
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
       
       const item_data = {
         user_id: _user_id,
         stock_id: _stock_id,
         count: _count,
       };
   
       console.log('item added successfully');
   
       return await collection.insertOne(item_data);

   }
   
export async function return_item( _item_id : string, _count : number) {
     try {

          
          get_item(_item_id).then((item) => {

               const curr_count = item["count"]

               const remain_count = curr_count - _count;

               if (remain_count < 0 )
                    console.log("cant return more than issued")
               
               else if(remain_count === 0)
                    remove_item(_item_id)

               else 
                    update_item(_item_id, remain_count)

               console.log("Item reutrn successfully")

          })

     } catch (error) {
          console.error('Error returning item:', error);
     }
}

