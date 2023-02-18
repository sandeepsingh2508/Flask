const { Pool } = require("pg");
const user = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Sandeep@250899",
  port: 5432,
});
module.exports = user;
