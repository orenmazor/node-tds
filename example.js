var mssql = require('./lib/mssql');

var connectionString = {'Server':'',
'Port':'',
'Database':'',
'User Id':'',
'Password':''};

var query = "";

var sqlserver = new mssql.mssql();

//try a connection
sqlserver.connect(connectionString);
