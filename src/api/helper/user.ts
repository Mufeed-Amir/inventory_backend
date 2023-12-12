
const { mongo_client } = require('./mongo_db');
import {ObjectId } from 'mongodb';

export async function create_user(data: object) {
  try {

    const client = await mongo_client();
    const collection = client.collection('user_data');

    return await collection.insertOne(data);

    console.log('Data inserted successfully');

  } catch (error) {
    console.error('Error inserting data:', error);
  }

}

export async function get_user(id: string, email: boolean = false) {
  try {

    const client = await mongo_client();
    const collection = client.collection('user_data');

    if (email)
      return await collection.findOne({ email: id })

    return await collection.findOne({ _id: new ObjectId(id) });


  } catch (error) {
    console.error('Cant find user', error);
  }
}

export async function delete_user(id: string) {
  try {

    const client = await mongo_client();

    const collection = client.collection('user_data');
    const user = await collection.deleteOne({ _id: new ObjectId(id) });

    console.log('user deleted successfully', user);

  } catch (error) {
    console.error('Cant find user', error);
  }
}

export async function update_user(data: object, id: string) {
  try {

    const client = await mongo_client();

    const collection = client.collection('user_data');
    const user = await collection.updateOne({ _id: new ObjectId(id) }, [{ $set: data }]);

    console.log('user updated successfully', user);
    return user;
  } catch (error) {
    console.error('error in updating user', error);
  }
}

