
import { issue_item, return_item, get_user_inventory } from './helper/_invent';

const issueItem = (req, res) => {

     const user_id = req.user["_id"];
     const stock_id = req.params.stockId;
     const count = Number(req.params.quantity);

     issue_item(user_id, stock_id, count).then((item_id) => {

          if (item_id)
               res.send(item_id);
          else
               res.send("Failed in issuing item")

          
     }).catch((error) => {
          res.send(error.message)
     })

};

const returnItem = (req, res) => {

     const item_id = req.params.itemId
     const count = Number(req.params.quantity);

     return_item(item_id, count).then((ack) => {

          if (ack)
               res.send("item return successfullyz")
          else
               res.send("Failed to return item")

     }).catch((error) => {
          res.send(error.message)
     })

};

const getUserInventory = (req, res) => {

     const user_id = req.user["_id"];

     get_user_inventory(user_id).then((items) => {

          if (items.length>0)
               res.send(items)
          else
               res.send("User doesnt issue any item yet")

          
     }).catch((error) => {
          res.send(error.message)
     })

};

module.exports = { issueItem, returnItem, getUserInventory};