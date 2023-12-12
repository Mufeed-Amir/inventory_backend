// userRoutes.ts

const { hashPassword, compare } = require('./helper/hash');


const { formatError } = require('./helper/api_service')

import { get_cred,update_cred } from './helper/cred';


const changeHash = (req, res) => {
  
  const user_id = req.user["_id"];
  const cur_pass = req.body["curr_pass"];

  get_cred(user_id).then((cred_data) => {

    if(!cred_data || !cred_data["cred"])
      res.send("cant fetch user_cred")

    console
    compare(cur_pass, cred_data["cred"]).then((result) => {

      if (result) {
        const new_pass = req.body["new_pass"];

        hashPassword(new_pass).then((hashed_cred) => {
          update_cred(user_id,hashed_cred);
          res.send("password changed");

        }); 
      }
      else
        res.status(400).json({ message: "Incorrect Password" })
    });
  })
};


module.exports = {changeHash};