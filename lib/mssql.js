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
        client.setEncoding("utf8");

        client.addListener("data", function(data) {
            console.log(data);
        });

        client.addListener("connect", function() {
            sys.puts("Client connected.");
            //send initial prelogin packet. negotiate for no TLS (for now)
            var buff = tds.Handshake();
            console.log(buff);
            var res = client.write(buff);
            
            //TODO parse the response packet.
            
            //okay, now lets try a LOGIN7 record to login
            buff = tds.Login7(connectionString['User Id'],connectionString['Password'],connectionString['Server'],connectionString['Database']);
            console.log(buff);
            result = client.write(buff);
            
        });

        client.addListener("close", function(data) {
            sys.puts("so long!");
        });
    }
    
    this.executeQuery = function executeQuery(query){
        if(isConnected && !isExecuting)
        {
            //do I even need to do this?
            isExecuting = true;
            
            var buff = tds.ExecuteQuery(query);
            var res = client.write(buff);
            
            //done
            isExecuting = false;
        }
    }
}

	