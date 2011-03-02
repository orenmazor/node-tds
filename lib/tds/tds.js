var sys = require('sys');
var Schema = require('./protobuf_for_node').Schema;
var fs = require('fs');
var tdsSchema = new Schema(fs.readFileSync('./lib/tds/tds.desc'));
var TDS = tdsSchema["tds.TDS_Packet"];


exports.tdslibrary = function tdslibrary()
{
    this.Handshake = function Handshake(){
    
        //TODO. payload should contain a list of my supported options.
        var handshake_packet = {tds_packet_type: 18, status: 0, length: 0, spid: 0, packet_number: 0, window:0, payload:[]};
    
        var data = TDS.serialize(handshake_packet);
    
        //I don't understand how to properly generate packet length with protobuf, so I hack.
        handshake_packet.length = data.length;
        
        data = TDS.serialize(handshake_packet);
    
        var data
        return data;
    }

    this.Login7 = function Login7(username,password){
        var login_packet = {tds_packet_type: 2, status: 0, length: 0, spid: 0, packet_number: 0, window:0, payload: []};
        
        //TODO serialize the userid
        
        var data = TDS.serialize(login_packet);
        login_packet.length = data.length;
        data = TDS.serialize(login_packet);
        return data;
    }

    this.ExecuteQuery = function ExecuteQuery(){
    
    }
    
}