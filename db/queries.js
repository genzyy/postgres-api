/**
 * Pool is used to connect to the postgres database with
 * the required auth and username password.
 */

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '123',
  port: 5432
});

/**
 * To write or get the data from the database, we
 * run the appropriate query for the postgres sql database
 * using pool.query() function and passing the query and a
 * callback function to handle error and also to get the
 * result.
 */

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

/**
 * Since we may need to pass some dynamic data with the queries,
 * we first pass the query with bash like variable indexing and
 * then we pass the arguments in the form of array, with a callback
 * function to get the data in return.
 */

const getUserbyId = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};
/**
 * When handling the POST or PUT methods
 * instead of sending the data in json we send the data
 * in text form because there is no point in sending a json
 * data when it is not being displayed and since the data is only used
 * to check the status of the method or query.
 */

const createUser = (req, res) => {
  const { name, email } = req.body;
  pool.query(
    'INSERT INTO users(name, email) VALUES($1, $2)',
    [name, email],
    (err, result) => {
      if (err) throw err;
      res.status(200).send(`User added with Id: ${result.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

/**
 * Exporting the methods so we can use them
 * in the main file.
 */

module.exports = {
  getUsers,
  getUserbyId,
  createUser,
  updateUser,
  deleteUser
};
