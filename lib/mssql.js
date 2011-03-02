//pre-reqs
var net = require('net');
var sys = require('sys');
var tdslibrary = require('./tds/tds').tdslibrary;
var tds = new tdslibrary();
//squirrely


exports.mssql = function mssql(){
    var isConnected = false;
    var isExecuting = false;
    var client;
    
    this.connect = function connect(connectionString){
        client = net.createConnection(connectionString['Port'],connectionString['Server']);
        client.setEncoding("UTF8");

        client.addListener("data", function(data) {
            sys.puts("Response from server: " + data);
            if (data == "close") client.end();
        });

        client.addListener("connect", function() {
            sys.puts("Client connected.");
            //send initial prelogin packet. negotiate for no TLS (for now)
            var buff = tds.Handshake();
            var res = client.write(buff);
            
            //okay, now lets try a LOGIN7 record to login
            buff = tds.Login7(connectionString['User Id'],connectionString['Password']);
            result = client.write(buff);
            
        });

        client.addListener("close", function(data) {
            sys.puts("Disconnected from server");
        });
    }
    
    this.executeQuery = function executeQuery(query){
        if(isConnected && !isExecuting)
        {
            isExecuting = true;
            
            //done
            isExecuting = false;
        }
    }
}


//	response
	
//authentication request
//	response
	
//client request
//	response
	