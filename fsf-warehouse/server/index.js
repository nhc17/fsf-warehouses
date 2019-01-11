////////////////////////////////////LIBRARIES////////////////////////////////////
require('dotenv').config()
const bodyParser = require('body-parser'),
      cors = require('cors') 
      express = require('express'),
      path = require('path'), 
      mysql = require("mysql");

const NODE_PORT = process.env.PORT;

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONLIMIT
})

const app = express();
const API_URI = "/api";
app.use(cors({
    origin: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sql query variables and constants for Warehouses
const sqlFindAllWarehouses = "SELECT * FROM warehouse"
const sqlFindWarehousesbyId = "SELECT * FROM warehouse WHERE warehouse_id = ?"
const sqlFindbyWarehousesbysearchString = "SELECT * FROM warehouse WHERE name LIKE ?"  // SELECT * FROM warehouse WHERE name LIKE "Tuas"
const sqlEditWarehouse = "UPDATE warehouse SET warehouse_name = ?, inventory_qty = ?  WHERE warehouse_id = ?"
const sqlAddWarehouse = "INSERT INTO warehouse (warehouse_id, warehouse_name, inventory_qty) VALUES (?, ?, ?)"
const sqlDeleteWarehouse = "DELETE FROM warehouse WHERE warehouse_id = ?"

// sql query variables and constants for Products
const sqlFindAllProducts = "SELECT * FROM products"
const sqlFindProductsbyId = "SELECT * FROM products WHERE product_id = ?"
const sqlFindbyProductsbysearchString = "SELECT * FROM products WHERE name LIKE ?"  
const sqlEditProduct = "UPDATE products SET name = ?, qty = ?  WHERE product_id = ?"
const sqlAddProduct = "INSERT INTO products (product_id, name, qty) VALUES (?, ?, ?)"
const sqlDeleteProduct = "DELETE FROM products WHERE product_id = ?"

// sql query variables and constants for Inventories
const sqlFindAllInventories = "SELECT * FROM Inventories"
const sqlFindInventorybyId = "SELECT * FROM Inventories WHERE warehouse_id = ?"
const sqlFindbyInventoriesbysearchString = "SELECT * FROM Inventories WHERE warehouse_name LIKE ?"  
const sqlEditInventory = "UPDATE Inventories SET warehouse_name = ? product_id = ?, name = ?, qty = ? WHERE warehouse_id = ?"
const sqlAddInventory = "INSERT INTO inventories (warehouse_id, warehouse_name, product_id, name, qty) VALUES (?, ?, ?, ?, ?)"
const sqlDeleteInventory = "DELETE FROM inventories WHERE warehouse_id = ?"

      var makeQuery = (sql, pool) => {
          console.log(sql);

          return (args) => {
              let queryPromise = new Promise((resolve, reject) => {
                  pool.getConnection((err, connection) => {
                      if(err) {
                          reject(err);
                          return;
                      }
                      console.log(args);

                      connection.query(sql, args || [], (err, results) => {  
                          connection.release();
                          if(err) {
                              reject(err);
                              return;
                          }
                          console.log(">>> ", + results);
                          resolve(results);
                      })
                  });
              });
              return queryPromise;
          }
      }


// var turned into promise when makeQuery executes
//Warehouses
var findAllWarehouses = makeQuery(sqlFindAllWarehouses, pool)
var findWarehousebyId = makeQuery(sqlFindWarehousesbyId, pool)
var findWarehousesbySearchString = makeQuery(sqlFindbyWarehousesbysearchString, pool)
var editWarehouse = makeQuery(sqlEditWarehouse, pool)
var addWarehouse = makeQuery(sqlAddWarehouse, pool)
var deleteWarehouse = makeQuery(sqlDeleteWarehouse, pool)

//Products
var findAllProducts = makeQuery(sqlFindAllProducts, pool)
var findProductbyId = makeQuery(sqlFindProductsbyId, pool)
var findProductsbySearchString = makeQuery(sqlFindbyProductsbysearchString, pool)
var editProduct = makeQuery(sqlEditProduct, pool)
var addProduct = makeQuery(sqlAddProduct, pool)
var deleteProduct = makeQuery(sqlDeleteProduct, pool)

//Inventories
var findAllInventories = makeQuery(sqlFindAllInventories, pool)
var findInventorybyId = makeQuery(sqlFindInventorybyId, pool)
var findInventoriessbySearchString = makeQuery(sqlFindbyInventoriesbysearchString, pool)
var editInventory = makeQuery(sqlEditInventory, pool)
var addInventory = makeQuery(sqlAddInventory, pool)
var deleteInventory = makeQuery(sqlDeleteInventory, pool)


////////////////////////////////////ROUTES//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// Warehouses /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET all warehouses or search string
app.get(API_URI + '/wshs', (req, res) => {
    console.info('query >>>>>', req.query)
    console.info('warehouse_name >>>>>', req.query.warehouse_name)
    if(!req.query.warehouse_name.trim()) {
      findAllWarehouses().then ((results) => {
        res.json(formatResults(results))
      }).catch((error) => {
        console.info(error)
        res.status(500).json(error)
      })
    }
    else {
      findWarehousesbySearchString([req.query.warehouse_name]).then ((results) => {0      
      res.json(formatResults(results))
      }).catch((error) => {
        console.info(error)
        res.status(500).json(error)
      })
    }
  })
    
// GET one warehouse by Id (params)
app.get(API_URI + '/wshs/:warehouseId', (req, res) => {
    console.info('params >>>>>', req.params);
    findWarehousebyId([parseInt(req.params.warehouseId)]).then ((results) => { 
      res.json(formatResults(results))
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })

  // EDIT one warehouse
app.put(API_URI + '/wshs/edit', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    editWarehouse([req.body.warehouse_name, req.body.inventory_qty, req.body.id]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })

 // ADD one warehouse
app.post(API_URI + '/wshs/add', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    addWarehouse([req.body.warehouse_id, req.body.warehouse_name, req.body.inventory_qty]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })
 
// DELETE one warehouse
app.post(API_URI + '/wshs/delete', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    deleteWarehouse([req.body.id]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })


//////////////// Products ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET all products or search string
app.get(API_URI + '/prods', (req, res) => {
    console.info('query >>>>>', req.query)
    console.info('product_name >>>>>', req.query.name)
    if(!req.query.name.trim()) {
      findAllProducts().then ((results) => {
        res.json(formatResults(results))
      }).catch((error) => {
        console.info(error)
        res.status(500).json(error)
      })
    }
    else {
      findProductsbySearchString([req.query.name]).then ((results) => {0      
      res.json(formatResults(results))
      }).catch((error) => {
        console.info(error)
        res.status(500).json(error)
      })
    }
  })
    
// GET one product by Id (params)
app.get(API_URI + '/prods/:productId', (req, res) => {
    console.info('params >>>>>', req.params);
    findProductbyId([parseInt(req.params.productId)]).then ((results) => { 
      res.json(formatResults(results))
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })

  // EDIT one product
app.put(API_URI + '/prods/edit', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    editProduct([req.body.name, req.body.qty, req.body.id]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })

 // ADD one product
app.post(API_URI + '/prods/add', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    addProduct([req.body.product_id, req.body.name, req.body.qty]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })
 
// DELETE one product
app.post(API_URI + '/prods/delete', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    deleteProduct([req.body.id]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })


//////////////// Inventories /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET all inventories or search string
app.get(API_URI + '/invs', (req, res) => {
    console.info('query >>>>>', req.query)
    console.info('warehouse_name >>>>>', req.query.warehouse_name)
    if(!req.query.warehouse_name.trim()) {
      findAllInventories().then ((results) => {
        res.json(formatResults(results))
      }).catch((error) => {
        console.info(error)
        res.status(500).json(error)
      })
    }
    else {
      findInventoriessbySearchString([req.query.warehouse_name]).then ((results) => {0      
      res.json(formatResults(results))
      }).catch((error) => {
        console.info(error)
        res.status(500).json(error)
      })
    }
  })
    
// GET one inventory by Id (params)
app.get(API_URI + '/invs/:warehouseId', (req, res) => {
    console.info('params >>>>>', req.params);
    findInventorybyId([parseInt(req.params.warehouseId)]).then ((results) => { 
      res.json(formatResults(results))
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })

  // EDIT one inventory
app.put(API_URI + '/invs/edit', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    editInventory([req.body.warehouse_name, req.body.product_id, req.body.name, req.body.qty, req.body.warehouse_id]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })

 // ADD one inventory
app.post(API_URI + '/invs/add', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    addInventory([req.body.warehouse_id, req.body.warehouse_name, req.body.product_id, req.body.name, req.body.qty]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })
 
// DELETE one inventory
app.post(API_URI + '/invs/delete', bodyParser.json(), bodyParser.urlencoded(), (req, res) => {
    console.info('body >>>>>', req.body);
    deleteInventory([req.body.id]).then ((results) => {
      res.json(results)
    }).catch((error) => {
      console.info(error)
      res.status(500).json(error)
    })
  })





















app.use(express.static(path.join(__dirname, '/public/mini-client_angular')));

app.listen(NODE_PORT, () => {
    console.log(`Listening to server at ${NODE_PORT}`)
})