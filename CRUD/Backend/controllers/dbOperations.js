var  config = require('../config/dbConnect');
const  sql = require('mssql');

async  function  getUsers() {
  try {
    let  pool = await  sql.connect(config);
    let  users = await  pool.request().query("SELECT * from Users");
    return  users.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  getUser(userId) {
  try {
    let  pool = await  sql.connect(config);
    let  user = await  pool.request()
    .input('input_parameter', sql.Int, userId)
    .query("SELECT * from Users where Id = @input_parameter");
    return  user.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  addUser(user) {
  try {
    let  pool = await  sql.connect(config);
    let  insertuser = await  pool.request()
    .input('Id', sql.Int, user.Id)
    .input('Name', sql.NVarChar, user.Name)
    .input('Age', sql.Int, user.Age)
    .input('Emailid', sql.NVarChar, user.Emailid)
    .input('Phoneno', sql.NVarChar, user.Phoneno)
    .execute('InsertUsers');
    return  insertuser.recordsets;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUsers:  getUsers,
  getUser:  getUser,
  addUser:  addUser
}