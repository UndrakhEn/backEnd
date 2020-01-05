const message = require('../utils/message');
const mssql = require('mssql');
const dbConfig = require('../utils/server');
const get = (req, res) => {
  conn = new mssql.ConnectionPool(dbConfig);
  req2 = new mssql.Request(conn);
  conn.connect(err => {
    if (err) {
      return res.json(message.ERROR);
    }
    req2.query('select* from users', (err, data) => {
      if (err) {
        return res.json(message.ERROR);
      } else {
        return res.json(message.SUCCESS(data.recordset));
      }
      conn.close();
    });
  });
};
const check = (req, res) => {
  let code = req.body.own_code;
  let pass = req.body.password;
  conn = new mssql.ConnectionPool(dbConfig);
  req2 = new mssql.Request(conn);
  conn.connect(err => {
    if (err) {
      console.log(err);
      return res.json(message.ERROR);
    }
    req2.query(
      `select * from users where own_code = '${code}' and password = '${pass}'`,
      (err, data) => {
        console.log(err, data);
        if (err) {
          conn.close();
          return res.json(message.ERROR);
        } else if (data.recordset.length == 0) {
          conn.close();
          return res.json(message.NOT_FOUND);
        } else {
          conn.close();
          return res.json(message.SUCCESS(data.recordset[0]));
        }
      }
    );
  });
};

module.exports = {
  get,
  check
};
