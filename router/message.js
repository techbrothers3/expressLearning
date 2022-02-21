/* eslint-disable camelcase */
const router = require('express').Router();
const mongoose = require('mongoose');
const logger = require('../logger/file');
const db = require('../logger/database');

const StudentRecords = require('../models/studentRecords');

mongoose.connect('mongodb://localhost:/studentInfo');

router.post('/addData', (req, res) => {
  const student = new StudentRecords({
    name: req.body.name,
    marks: req.body.marks,
  });
  student.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        err: error,
      });
    });
});
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
router.post('/authors', (req, res) => {
  const { author_id, author_name } = req.body;
  if (author_id && author_name) {
    try {
      db.promise().query(`INSERT INTO authors VALUES
      ('${author_id}','${author_name}')`);
    } catch (err) {
      logger.error(err);
    }
  }
  res.send(req.body);
});
router.post('/books', (req, res) => {
  const { author_id, books_name } = req.body;
  if (author_id && books_name) {
    try {
      db.promise().query(`INSERT INTO books VALUES
      ('${author_id}','${books_name}')`);
    } catch (err) {
      logger.error(err);
    }
  }
  res.send(req.body);
});
router.get('/book', (req, res) => {
  const book_name = req.params.name;
  db.query(
    'select books.books_name, authors.author_name from books inner join authors on books.author_id = authors.author_id where books.books_name = ?',
    [book_name],
    (err, results) => {
      logger.info(results);
      res.send(results);
    },
  );
});
router.get('/author/:name', (req, res) => {
  const author_name = req.params.name;
  // res.send(author_name);
  db.query(
    'select authors.author_name, books.books_name from authors inner join books on authors.author_id = books.author_id where authors.author_name = ?',
    [author_name],
    (err, results) => {
      logger.info(results);
      res.send(results);
    },
  );
});
router.get('/bookSearch/:name', (req, res) => {
  const book_name = req.params.name;
  db.query(
    'select books.books_name, authors.author_name from books inner join authors on authors.author_id = books.author_id where books.books_name = ?',
    [book_name],
    (err, results) => {
      logger.info(results);
      res.send(results);
    },
  );
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
router.put('/:name', async (req, res) => {
  logger.info(JSON.stringify(req.params.name));
  logger.info(JSON.stringify(req.body));
  const [rows] = await db.promise().query(`update studentRecords set password = ${req.body.marks} where username = ${JSON.stringify(req.params.name)}`);
  logger.info(rows.affectedRows);
  if (rows.affectedRows === 0) {
    res.status(404).send();
  } else {
    res.send({ RowsUpdated: rows.affectedRows });
  }
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
