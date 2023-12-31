import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

import {get_user} from './helper/user';
const { compare } = require('./helper/hash');

const { gentoken } = require('./helper/auth')

import { LoginUser } from './schema/request';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { get_cred } from './helper/cred';



const login = async (req: Request, res: Response) => {

  const errors = await validate(plainToClass(LoginUser, req.body));

  if (errors.length > 0)
    return res.status(400).json({ errors: formatError(errors) });


  const body = req.body;
  const email = body["email"];
  const secret = body["password"];


  get_user(email, true).then((user_data) => {

    if (!user_data) return res.send("User doesn't exists");

    const user_id = user_data._id.toHexString()
   
    get_cred(user_id).then((cred_data) => {

      if(!cred_data)
        res.send("cant fetch user_cred")

      compare(secret, cred_data["cred"]).then((result) => {

        if (result) {

          const access_token = gentoken(user_data["_id"])
          const refresh_token = gentoken(user_data["_id"], true)

          res.status(200).json({
            token: access_token,
            ref_token: refresh_token
          })
        }
        else
          res.status(400).json({ message: "Incorrect Password" })

      });
    })
  })
};

const authorisation = (req, res, next) => {
  const authHeader: any = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })

}

const getToken = (req, res) => {

  const body = req.body;
  const ref_token = body.ref_token;

  if (ref_token == null) return res.sendStatus(401);

  jwt.verify(ref_token, process.env.ACCESS_REFRESH_SECRET, (err, user) => {

    console.log(user);
    if (err) return res.sendStatus(403)

    const access_token = gentoken({ email: user.email });

    res.status(200).json({ token: access_token })

  })
}

module.exports = { login, authorisation, getToken };