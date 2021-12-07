const router = require('express').Router();
const logger = require('./logger/file');
const db = require('./logger/database');

router.post('/', (req, res) => {
  logger.info('some info logging message');
  const { username, password } = req.body;

  if (username && password) {
    try {
      db.promise().query(`INSERT INTO users VALUES('${username}','${password}')`);
    } catch (err) {
      console.log(err);
    }
  }
  res.send({});
});

router.get('/', (req, res) => {
  logger.info('executing query');
  db.execute(
    'select * from users',
    (err, results, fields) => {
      console.log(results);
      // console.log(fields);
      res.send(results);
    },
  );
});

// router.post('/', (req, res) => {
//   logger.info('hi');
//   const { username, password } = req.body;
//   db.query(`INSERT INTO users VALUES('${username}','${password}')`);
//   res.json(req.body);
// });

module.exports = {
  messageRouter: router,
};
