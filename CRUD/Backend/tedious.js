const dotenv = require("dotenv");
dotenv.config();

var tds = require("tedious");
var Request = require("tedious").Request;
var Types = require("tedious").TYPES;
var ConnectionPool = require("tedious-connection-pool");
const config = require('./config/dbConnect')
// var poolConfig = {
//   min: 10,
//   log: true,
// };

// var config = {
//   userName: process.env.USER,
//   password: process.env.PASSWORD,
//   server: process.env.SERVER,
//   options: {
//     requestTimeout: 30 * 1000,
//     rowCollectionOnRequestCompletion: true,
//     database: "crud",
//     encrypt: true,
//   },
// };

// var pool = new ConnectionPool(poolConfig, config); 

// pool.acquire(function (err, connection) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("connected");
//   }
// });

var conn = new tds.Connection(dbConnect);

pool.on("error", function (err) {
  console.log(err);
});

// var conn = new tds.Connection(dbConnect);

// function requestDone(rowCount, more) {
//   console.log(rowCount + "rows------");
//   console.log(column);
// }

// function infoError(info) {
//   console.log(info.number + " : " + info.message);
// }

// function debug(message) {
//   console.log(message);
// }

// var exec = function (sql, callback) {
  
//   var request = new Request(sql, function (err, rowCount) {
//     if (err) {
//       console.log("Statement failed: " + err);
//     } else {
//       console.log(rowCount + " rows");
//     }

//     callback(err, obj);
//   });

//   var obj = []; 

//   request.on("row", function (columns) {
    
//     var values = {}; 
//     columns.forEach(function (column) {
      
//       if (column.isNull) {
//         values[column.metadata.colName] = null;
//       } else {
//         values[column.metadata.colName] = column.value;
//       }
//     });
//     obj.push(values);
//   });
//   conn.execSql(request);
//   //console.log('obj: ' + obj);
//   return obj;
//   function columnMetadata(columnsMetadata) {
//     columnsMetadata.forEach(function (column) {
//       //console.log(column);
//     });
//   }
// };

var storedProcedures = {
  
  purchasing_list:
    
    {
      fullName: "Purchases.dbo.purchasing_list",
      //fullname of stored procedure
      variable: "purchaseList",
      //the name of my "Table Type" Variable created in SQL
      Columns: [
        { name: "ItemNo", type: Types.Int },
        { name: "ProductName", type: Types.NVarChar },
        { name: "ProductDescription", type: Types.NVarChar },
        { name: "Qty", type: Types.Int },
        {name:"Price",type:Types.Int}
      ],
    },
  another_stored_procedure: {
    fullName: "Purchases.dbo.another_stored_procedure",
    variable: "purchaseList",
    Columns: [
      { name: "ItemNo", type: Types.Int },
      { name: "ProductName", type: Types.NVarChar },
        { name: "ProductDescription", type: Types.NVarChar },
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

  conn.execSql(request);
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

  conn.execSql(request);
};

exports.conn = conn;
exports.exec = exec;
exports.callProc = callProc;
exports.insert = insert;
exports.update = update;