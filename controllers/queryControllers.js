const user = require("../database");
user.connect();

//get all users
const getUsers = async (req, res) => {
  await user.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

//get single user by id
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  await user.query(
    "SELECT * FROM users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
};

//create new user
const createUser = async (req, res) => {
  const { Id, username, email, Password, created_at } = req.body;

  await user.query(
    "INSERT INTO users (Id,username, email,Password,created_at) VALUES ($1, $2,$3,crypt($4,gen_salt('bf')),$5)",
    [Id, username, email, Password, created_at],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

//update user details
const updateUser = async(req, res) => {
  const id = parseInt(req.params.id);
  const { username, email } = req.body;

  await user.query(
    "UPDATE users SET username = $1, email = $2 WHERE id = $3",
    [username, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

//delete user by id
const deleteUser = async(req, res) => {
  const id = parseInt(req.params.id);

 await user.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
