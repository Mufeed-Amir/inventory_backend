const { mongo_client } = require('./mongo_db');

export async function add_cred(data: object) {
     try {

          const client = await mongo_client();
          const collection = client.collection('credentials');

          console.log('Password added  successfully');
          return await collection.insertOne(data);

     } catch (error) {
          console.error('Error in adding password', error);
     }

}

export async function delete_cred(user_id: string) {
     try {

          const client = await mongo_client();

          const collection = client.collection('credentials');

          const user = await collection.deleteOne({ user_id: user_id});

          console.log('Password deleted successfully');

     } catch (error) {
          console.error('Error in deleting password', error);
     }

}

export async function update_cred(user_id: string, updated_hash: string) {
     try {

          const client = await mongo_client();
          const collection = client.collection('credentials');

          console.log('Password changed successfully');
          return await collection.updateOne({ user_id: user_id }, { $set: { cred: updated_hash } });

     } catch (error) {
          console.error('Error in changing password', error);
     }

}

export async function get_cred(user_id: any) {
     try {
          const client = await mongo_client();
          const collection = client.collection('credentials');

          return await collection.findOne({ user_id: user_id});

     } catch (error) {
          console.error('Error in getting credentials', error);
     }

}


