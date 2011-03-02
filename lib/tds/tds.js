var sys = require('sys');
//var Schema = require('./protobuf_for_node').Schema;
var fs = require('fs');
//var tdsSchema = new Schema(fs.readFileSync('./lib/tds/tds.desc'));
//var TDS = tdsSchema["tds.TDS_Packet"];


exports.tdslibrary = function tdslibrary()
{
    //This is the first thing every good TDS server endpoint expects. My version
    //only sends the basic existance stuff, but there's half a dozen options, or
    //'tokens' you could specify here. specifically of interest is encryption.
    this.Handshake = function Handshake(){
        
        var handshake_packet = new Buffer(9);
        //packet type: prelogin
        handshake_packet[0] = 0x12;
        
        //packet status: 'normal'
        handshake_packet[1] = 0x0;
        
        //packet length:
        handshake_packet[2] = 0x08;
        handshake_packet[3] = 0x00;
        
        //packet spid is the process id on the server side. we don't care.
        handshake_packet[4] = 0x0;
        handshake_packet[5] = 0x0;
        
        //packet id: only one here.
        handshake_packet[6] = 0x01;
        
        //window id: just the one, again.
        handshake_packet[7] = 0x00;
        
        //TODO: what other options do I want to support? this prelogin packet only allows for a Login7
        
        //termination token
        handshake_packet[8] = 0xFF;
     
        return handshake_packet;
    }

    //Login7 is the old style of login (i.e. TDS version 7 or before). most servers are backwards compatible
    //enough to support this.
    //TODO: the offsets for the payload data are off.
    this.Login7 = function Login7(username,password,hostname,servername){
        
        //I regret everything.
        var login7_packet = new Buffer(160);
        
        //packet type: LOGIN7
        login7_packet[0] = 0x10;
        
        //packet status: 'normal'
        login7_packet[1] = 0x0;
        
        //packet length: MUST be less than 128k bytes
        login7_packet[2] = 0x0;
        login7_packet[3] = 0x08;
        
        //packet spid is the process id on the server side. we don't care.
        login7_packet[4] = 0x0;
        login7_packet[5] = 0x0;
        
        //packet id: only one here.
        login7_packet[6] = 0x01;
        
        //window id: just the one, again.
        login7_packet[7] = 0x00;
        
        //now for the body:
        
        //the length of the login payload
        login7_packet[8] = 0x0;
        login7_packet[9] = 0x0;
        login7_packet[10] = 0x0;
        login7_packet[11] = 0x0;
        
        //TDS version
        login7_packet[12] = 0x0;
        login7_packet[13] = 0x0;
        login7_packet[14] = 0x0;
        login7_packet[15] = 0x71;
        
        //packet size
        login7_packet[16] = 0x0;
        login7_packet[17] = 0x0;
        login7_packet[18] = 0x0;
        login7_packet[19] = 0x0;
        
        //don't cares for multi-threaded, multi-client stuff
        //program version (what for?)
        login7_packet[20] = 0x0;
        login7_packet[21] = 0x0;
        login7_packet[22] = 0x0;
        login7_packet[23] = 0x0;
        
        //clientpid
        login7_packet[24] = 0x0;
        login7_packet[25] = 0x0;
        login7_packet[26] = 0x0;
        login7_packet[27] = 0x0;
        
        //connectionid
        login7_packet[28] = 0x0;
        login7_packet[29] = 0x0;
        login7_packet[30] = 0x0;
        login7_packet[31] = 0x0;
        
        //flags1
        login7_packet[32] = 0x0;
        //flags2
        login7_packet[34] = 0x0;
        //flags3
        login7_packet[35] = 0x0;
        
        //turn TSQL on and OLEDB on
        login7_packet[36] = 0x02;
        
        //timezone
        login7_packet[37] = 0xE0;
        login7_packet[38] = 0x01;
        login7_packet[39] = 0x0;
        login7_packet[40] = 0x0;
        
        //collation
        login7_packet[41] = 0x09;
        login7_packet[42] = 0x4;
        login7_packet[43] = 0x0;
        login7_packet[44] = 0x0;
        
        //login struct header done. now for the actual login info. ib* is for offset, cch* is for the length of the parameter
        
        //position of ibhostname
        login7_packet[45] = 0x0;
        login7_packet[46] = 0x0;
        
        //position of cchhostname
        login7_packet[47] = 0x0;
        login7_packet[48] = 0x0;
        
        //position of ibusername
        login7_packet[49] = 0x0;
        login7_packet[50] = 0x0;
        
        //position of ccchusername
        login7_packet[51] = 0x0;
        login7_packet[52] = 0x0;
        
        //position of ibpassword
        login7_packet[53] = 0x0;
        login7_packet[54] = 0x0;
        
        //position of cchpassword
        login7_packet[55] = 0x0;
        login7_packet[56] = 0x0;
        
        //position of ibappname
        login7_packet[57] = 0x0;
        login7_packet[58] = 0x0;
        
        //position of cchappname
        login7_packet[59] = 0x0;
        login7_packet[60] = 0x0;
        
        //position of ibservername
        login7_packet[61] = 0x0;
        login7_packet[62] = 0x0;
        
        //position of cchservername
        login7_packet[63] = 0x0;
        login7_packet[64] = 0x0;
        
        //position of unused
        login7_packet[65] = 0x0;
        login7_packet[66] = 0x0;
        
        //position of unused
        login7_packet[67] = 0x0;
        login7_packet[68] = 0x0;
        
        //position of ib client internal name
        login7_packet[69] = 0x0;
        login7_packet[70] = 0x0;
        
        //position of cch clint
        login7_packet[71] = 0x0;
        login7_packet[72] = 0x0;
        
        //position of language
        login7_packet[73] = 0x0;
        login7_packet[74] = 0x0;
        
        //position of database
        login7_packet[75] = 0x0;
        login7_packet[76] = 0x0;
        
        //position of cchdatabase
        login7_packet[77] = 0x0;
        login7_packet[78] = 0x0;
        
        //client id
        login7_packet[79] = 0x0;
        login7_packet[80] = 0x0;
        login7_packet[81] = 0x0;
        login7_packet[82] = 0x0;
        login7_packet[83] = 0x0;
        login7_packet[84] = 0x0;
        
        //ibsspi
        login7_packet[85] = 0x0;
        login7_packet[86] = 0x0;
        //cchsspi
        login7_packet[87] = 0x0;
        login7_packet[88] = 0x0;
        
        //ibattachdbfile
        login7_packet[85] = 0x0;
        login7_packet[86] = 0x0;
        //cchattachdbfile
        login7_packet[87] = 0x0;
        login7_packet[88] = 0x0;
        
        //ibchangepassword
        login7_packet[89] = 0x0;
        login7_packet[90] = 0x0;
        //cchchangepassword
        login7_packet[91] = 0x0;
        login7_packet[92] = 0x0;
        
        //cbsspilong
        login7_packet[93] = 0x0;
        login7_packet[94] = 0x0;
        login7_packet[95] = 0x0;
        login7_packet[96] = 0x0;
        
        //serialize the username and password
        
        //hostname:
        var buffer = new Buffer(hostname,encoding='utf8');
        buffer.copy(login7_packet,97,0,buffer.length);
        login7_packet[45] = index;
        login7_packet[47] = buffer.length;
        var index = 97 + hostname.length;
        
        //username
        buffer = new Buffer(username,encoding='utf8');
        buffer.copy(login7_packet,index,0,buffer.length);
        login7_packet[49] = index;
        login7_packet[51] = buffer.length;
        index += buffer.length;
        
        //password:
        buffer = new Buffer(password,encoding='utf8');
        buffer.copy(login7_packet,index,0,buffer.length);
        login7_packet[53] = index;
        login7_packet[55] = buffer.length;
        index += buffer.length;
        
        //servername
        buffer = new Buffer(servername,encoding='utf8');
        buffer.copy(login7_packet,index,0,buffer.length);
        login7_packet[61] = index;
        login7_packet[63] = buffer.length;
        index += buffer.length;
        
        //libraryname
        buffer = new Buffer("node-tds",encoding='utf8');
        buffer.copy(login7_packet,index,0,buffer.length);
        login7_packet[69] = index;
        login7_packet[71] = buffer.length;
        index += buffer.length;
     
        return login7_packet;
    }

    this.ExecuteQuery = function ExecuteQuery(query){
        var query_packet = new Buffer(9);
        //packet type: SQL Batch
        query_packet[0] = 0x1;
        
        //packet status: 'normal'
        query_packet[1] = 0x0;
        
        //packet length:
        query_packet[2] = 0x0;
        query_packet[3] = 0x08;
        
        //packet spid is the process id on the server side. we don't care.
        query_packet[4] = 0x0;
        query_packet[5] = 0x0;
        
        //packet id: only one here.
        query_packet[6] = 0x01;
        
        //window id: just the one, again.
        query_packet[7] = 0x00;
        
        
        var buffer = new Buffer(query,encoding='utf8');
        buffer.copy(query_packet,8,0,buffer.length);
        
        query_packet[8+buffer.length] = 0xFF;
        
        return query_packet;
    }
}