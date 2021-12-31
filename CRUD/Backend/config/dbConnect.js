const dotenv = require("dotenv");
dotenv.config();

var tds = require("tedious");
var Request = require("tedious").Request;
var Types = require("tedious").TYPES;
var sql = require('mssql')
var config = {
    "user": process.env.USER, 
    "password": process.env.PASSWORD,
    "server": "ASPIREVM12-24",
    "database": process.env.DATABASE, 
    "driver": "tedious",
    "options": {
        "encrypt": true,
        "trustServerCertificate": true
    }
}

const dbConnect = sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection made to sql server !");

    new sql.Request().query("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))", (err, result) => {
        console.dir("Table created")
        
    })
});

sql.on('error', err => {
    console.log("Sql database connection error ", err);
})

var conn = new tds.Connection(config);

var storedProcedures = {
  purchasing_list:    
    {
      fullName: "Purchases.dbo.purchasing_list",
      //fullname of stored procedure
      variable: "purchaseList",
      //the name of my "Table Type" Variable created in SQL
      Columns: [
        { name: "ItemNo", type: Types.Int },
        { name: "ProductName", type: Types.VarChar },
        { name: "ProductDescription", type: Types.VarChar },
        { name: "Qty", type: Types.Int },
        {name:"Price",type:Types.Int}
      ],
    },
  another_stored_procedure: {
    fullName: "Purchases.dbo.another_stored_procedure",
    variable: "purchaseList",
    Columns: [
      { name: "ItemNo", type: Types.Int },
      { name: "ProductName", type: Types.VarChar },
        { name: "ProductDescription", type: Types.VarChar },
        { name: "Qty", type: Types.Int },
      {name:"Price",type:Types.Int}
      
    ],
  },
};

var callProc = function (procedureName, Rows, callback) {
  var usefulData = storedProcedures[procedureName];
  var message = "";

  var table = {
    columns: usefulData["Columns"],
    rows: Rows,
   
  };

  var request = new Request(usefulData["fullName"], function (err, rowCount) {
    if (err) {
      console.log("Statement failed: " + err);
      message = "There was a problem submitting your request!";
    } else {
      console.log(rowCount + "No errors in TVP");
     message = "Success";
    }
    callback(err, message);
  });

  request.on("doneProc", function (rowCount, more, returnStatus, rows) {
    
  });

  request.addParameter(usefulData["variable"], Types.TVP, table);
  

  conn.callProcedure(request);
};

var insert = function (sql, callback) {
  var request = new Request(sql, function (err, rowCount) {
    if (err) {
      console.log("Statement failed: " + err);
      callback = err;
    } else {
      console.log("Insert Statement succeeded");
      callback = "Success";
    }
  });

  execSql(request);
};

var update = function (sql, callback) {
  var insert = "";
  var request = new Request(sql, function (err, rowCount) {
    if (err) {
      insert = "Statement failed: " + err;
    } else {
      insert = "Insert Statement succeeded";
    }
    callback(err, insert);
  });

  execSql(request);
};


exports.callProc = callProc;
exports.insert = insert;
exports.update = update;
exports.dbConnect = dbConnect