var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database : 'miniproject'
});
connection.query('SELECT * FROM `user` WHERE name = "pepi" and pass="123456" ', function(err, result) {
if (err){
    throw err;}
else if(result.length>0){
    
    console.log("true");
    exports.send ="true";
   // module.exports={ signin: function () {
    // whatever
   // }
  //}.signin = "true";}
}
else{
    console.log("wrong");
}



});
connection.end();
console.log('Test MySQL');
