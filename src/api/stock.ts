
import { add_stock, get_stock, remove_stock, update_stock } from './helper/_stock';


const addStock = (req, res) => {

  const stock_name = req.query.name;
  const stock_count = req.query.quantity;

  add_stock(stock_name, stock_count).then((stock_id) => {
    if (stock_id)
      res.send(stock_id);
    else
      res.send("couldn't add the stock")

  }).catch((error) => {
    res.send(error.message)
  })

};


const getStock = (req, res) => {

  const stock_id = req.params.stockId;

  get_stock(stock_id).then((stock) => {
    if (stock)
      res.send(stock);
    else
      res.send("couldn't get the stock")

  }).catch((error) => {
    res.send(error.message)
  })

};


const removeStock = (req, res) => {

  const stock_id = req.params.stockId;

  remove_stock(stock_id).then((ack) => {
    if (ack)
      res.send("stock removed");
    else
      res.send("couldn't remove the stock")
    
  }).catch((error) => {
    res.send(error.message)
  })

};


const updateStock = (req, res) => {

  const stock_id = req.params.stockId;
  const data = req.body;

  update_stock(stock_id, data).then((ack) => {
    if (ack)
      res.send("stock updated");
    else
      res.send("couldn't update the stock")

  }).catch((error) => {
    res.send(error.message)
  })

};


module.exports = { addStock, getStock, removeStock, updateStock }