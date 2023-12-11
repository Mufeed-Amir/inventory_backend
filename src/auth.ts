const jwt = require('jsonwebtoken');

function gentoken( id : string , refresh_token: boolean = false ){

     if(refresh_token)
          return jwt.sign({_id: id},process.env.ACCESS_REFRESH_SECRET,{expiresIn: '14400s'});
     
     
     return jwt.sign({_id: id},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1800s'});
     
}

module.exports = { gentoken}



