// userRoutes.ts
import { Request, Response } from 'express';
import { create_user, get_user, delete_user, update_user } from '../user';

const { hashPassword, compare } = require('../hash');

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { credUser} from './schema/request';

const { formatError } = require('../api/helper/api_service')

import { get_cred,update_cred } from '../cred';


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