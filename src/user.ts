
const { mongo_client } = require('./mongo_db'); 


export async function create_user(data: object) {
     try {

       const client = await mongo_client();
       
       const collection = client.collection('user_data');
       await collection.insertOne(data);
   
       console.log('Data inserted successfully');
     } catch (error) {
       console.error('Error inserting data:', error);
     }
     finally {
     }
   }

export async function find_user(_email: string) {
     try {

       const client = await mongo_client();
       
       const collection = client.collection('user_data');
       const user =await collection.findOne({email : _email});
     
       console.log('user exist',user);
       return user;
     } catch (error) {
       console.error('Cant find user', error);
     }
     finally {
     }
}

// module.exports={find_user,create_user};
