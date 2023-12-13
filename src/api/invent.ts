
import { issue_item ,return_item } from './helper/_invent';
import {get_stock} from './helper/_stock' ;


const issueItem = (req, res) => {
  
     const user_id = req.user["_id"];
     const stock_id = req.params.stockId;
     const count = Number(req.params.quantity) ;

     issue_item(user_id, stock_id, count).then((ack)=> {
     if(ack)
           res.send(ack.insertedId);

  }).catch((error) => {
     res.send(error.message)
  })

};

const returnItem = (req, res) => {
  
     const item_id = req.params.itemId
     const count = req.params.quantity;

     return_item(item_id, count).then(( ack) => {
          
          console.log("item return successfully");
          res.send(ack)
     })

};

module.exports = { issueItem ,returnItem};