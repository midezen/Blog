import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CAbiNETs1703!*",
  database: "blog",
});
db.connect((err) => {
  if (err) {
    return console.log("db not connected " + err);
  } else {
    return console.log("db connection successfull");
  }
});
