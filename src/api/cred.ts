// userRoutes.ts
import { Request, Response } from 'express';
import { create_user, get_user, delete_user, update_user } from '../user';

const { hashPassword, compare } = require('../hash');

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { credUser} from './schema/request';

const { formatError } = require('../api/helper/api_service')


const changeHash = (req, res) => {
  
  const user_id = req.user["_id"];

  console.log("*********", req.body);

  res.send("password changed");

};


module.exports = {changeHash};