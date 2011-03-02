var sys = require('sys');
var Schema = require('./protobuf_for_node').Schema;
var fs = require('fs');
var tdsSchema = new Schema(fs.readFileSync('./tds.desc'));
var TDS = tdsSchema["tds.TDS_Packet"];
var handshake_packet = {tds_packet_type: 18, status: 0, length: 0, spid: 0, packet_number: 0, window:0, payload:[]};

//var packet = handshake_packet.parse({});


var data = TDS.serialize(handshake_packet);

//handshake_packet.length = data.length;
//data = TDS.serialize(handshake_packet);

var buff = new Buffer(data.length);

data.copy(buff);

console.log(buff);
//sys.puts(buff[0]);