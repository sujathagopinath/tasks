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
    // .input('pk_user_Id', sql.Int, user.pk_user_Id)
    .input('Name', sql.VarChar, user.Name)
    .input('EmailId', sql.VarChar, user.EmailId)
    .input('Password', sql.VarChar, user.Password)
    .execute('AddUser');
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