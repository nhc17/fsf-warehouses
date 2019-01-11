////////////////////////////////////LIBRARIES////////////////////////////////////
require('dotenv').config()
const bodyParser = require('body-parser'),
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

// sql query variables and constants
const sqlFindAllWarehouses = "SELECT * FROM warehouse"
const sqlFindWarehousebyId = "SELECT * FROM warehouse WHERE id = ?"
const sqlFindbySWarehouseearchString = "SELECT * FROM warehouse WHERE name LIKE ?"  // SELECT * FROM warehouse WHERE name LIKE "Tuas"
const sqlEditWarehouse = "UPDATE warehouse SET name = ?, inventory_qty = ?  WHERE id = ?"
const sqlAddBook = "INSERT INTO books (author_firstname, author_lastname, title, cover_thumbnail) VALUES (?, ?, ?, ?)"
const sqlDeleteBook = "DELETE FROM books WHERE id = ?"

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

      var findAllBooks = makeQuery(sqlFindAllBooks, pool);
      var findOneBookById = makeQuery(sqlFindOneBook, pool);

      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());

      app.get("/books", (req, res) => {
          console.log("/books query !");
          var bookId = req.query.bookId;
          console.log(bookId);
          if(typeof(bookId) === 'undefined') {
              console.log(">>>" + bookId);
              findAllBooks([5,5]).then((results) => {
                  console.log(results);
                  res.json(results);
              }).catch((error) => {
                  res.status(500).json(error);
              });
          } else {
              console.log(bookId);
              findOneBookById([parseInt(bookId)]).then((results) => {
                  console.log(results);
                  res.json(results);
              }).catch((error) => {
                  console.log(error);
                  res.status(500).json(error);
              });
         
     
        }
      })

      app.get('/books/:bookId', (req, res) => {
        console.log("/books param !");
        let bookId = req.params.bookId;
        console.log(bookId);
        findOneBookById([parseInt(bookId)]).then((results) => {
            console.log(results);
            res.json(results);
        }).catch((error) => {
            res.status(500).json(error);
        })
            
        });

const INSERT_WSH = 'insert into warehouse (warehouse_id, name, inventory_qty) values (?, ?, ?)'

app.post('/wsh', bodyParser.urlencoded({ extended: true }),
    (req, resp ) => {
        pool.getConnection((err, conn) => {
            if (err)
             // console.error('DB ERROR: ', err);
            // process.exit(-1);
                return resp.status(400).json({ error: err, status: 'error'});
            conn.query(INSERT_WSH,
                [ req.body.warehouse_id, req.body.name, req.body.inventory_qty],
                (err) => {
                    if (err)
                        return resp.status(400).json({ error: err, status: 'error' });
                    resp.status(200).json({ status: 'success '});
         }
        )
    })
  } 
);

app.get('/wsh', (req, resp) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    pool.getConnection((err, conn) => {
        if (err) {
            console.error('DB_ERROR ', err);
            process.exit(-1);
        }
        conn.query(
            'SELECT * FROM warehouse LIMIT ? OFFSET ?', [ limit, offset ],
            (err, result ) => {
                conn.release();
                if (err) 
                    return resp.status(400).json({ error: err });
                resp.status(200);
                resp.format({
                    'application/json': () => resp.json(result),
                    default: () => resp.json(result)
                    })
                }      
        );
     });
    });

app.use(express.static(path.join(__dirname, '/public/mini-client_angular')));

app.listen(NODE_PORT, () => {
    console.log(`Listening to server at ${NODE_PORT}`)
})