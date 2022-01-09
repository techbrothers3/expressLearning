const router = require('express').Router();
const logger = require('../logger/file');
const db = require('../logger/database');
const student = require('../models/studentRecords');

router.post('/', (req, res) => {
  logger.info('some info logging message');
  const { name, marks } = req.body;

  if (name && marks) {
    try {
      db.promise().query(`INSERT INTO studentRecords VALUES
     ('${name}','${marks}')`);
      
    } catch (err) {
      logger.error(err);
    }
  }
  // logger.log(username);
  res.send(req.body);
});

router.get('/', (req, res) => {
  logger.info('executing query');
  db.execute(
    'select * from studentRecords',
    (err, results) => {
      logger.info(results);
      // console.log(fields);
      res.send(results);
    },
  );
});
router.put('/:name', (req, res) => {
  // console.log(req.params.username);
  // logger.info(req.params);
  student.findOneAndUpdate({ _name: req.params.name }, {
    $set: {
      name: req.body.name,
      marks: req.body.marks,
    },
  })
    .then((result) => {
      res.status(200).json({
        updated_product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// router.post('/', (req, res) => {
//   logger.info('hi');
//   const { username, password } = req.body;
//   const result = db.query(`INSERT INTO users VALUES('${username}','${password}')`);
//   logger.info(result);
//   res.json(req.body);
// });

module.exports = {
  messageRouter: router,
};
