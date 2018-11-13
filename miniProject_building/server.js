var mysql = require('mysql');
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '',
database : 'miniproject'
});
// server.js
// load the things we need
var express = require('express');
var app = express();
var path = require ('path');

//var fs = require('fs');
//var signin = require('./routes/select_db');//edit
//var signin = require('./select_db');
// set the view engine to ejs
//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './code')));
app.use(express.static(__dirname+"/views/pages" ));
app.use(express.static(__dirname+"/views/pages/img" ));
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname + '/views/pages/home.html'));
    namepath =""; //name user
yourPet="";
 json = "";
 result_regis="";
 NamePet ="";
 dataPet = "";
 result_feed ="";
result_play ="";
namepet_pet="";
});
app.get('/signin', function(req, res) {
     res.sendFile(path.join(__dirname + '/views/pages/signin.html'));
});
app.get('/signup', function(req, res) {
     res.sendFile(path.join(__dirname + '/views/pages/signup.html'));
});
app.get('/create', function(req, res) {
     res.sendFile(path.join(__dirname + '/views/pages/create_pet.html'));
});

app.get('/namepath', function(req, res) {
     res.send(namepath);
});

var router = express.Router();
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
/*-------------------------------call func----------------------*/
var namepath =""; //name user
var yourPet="";
var json = "";
var result_regis="";
var NamePet ="";
var dataPet = "";
var result_feed ="";
var result_play ="";
var namepet_pet="";
app.get('/getUser',function(req,res){
     console.log(namepath);
     res.send(namepath);
});

/*----------------------------------page profile--------------------------------------------------------*/

//http://localhost:8080/getProfile?table=leon

app.get('/getProfile', function(req, res) {
     var getjson = getKeys(req.query);
    // var key = getjson[0] ; //name,pass
     var value = getjson[1];
     console.log("value="+value);
     console.log("call page");
     getTable(value);
     res.sendFile(path.join(__dirname + '/views/pages/profile.html'));
     console.log("call page2");
    // res.send(yourPet);
});

app.get('/mydata', function(req, res){
     console.log("yourPet"+yourPet);
     res.send(yourPet);
});
function getTable(user){
     
      connection.query('SELECT DISTINCT( pet_name),type,user FROM `pet` WHERE user = "'+user+'"', function(err, rows) {
     
    if (err){
    throw err;}
    else if(rows.length>0){
          yourPet=JSON.stringify(rows);
          console.log("true");
          console.log("data="+yourPet);
    //console.log("namepath="+namepath);
    //res.send(name);
   //var file = fs.createReadStream('/views/pages/profile.html');
   //file.pipe(true);
    //fs.readFileSync(path.join(__dirname + '/views/pages/profile.html')); //--change page
}
else{
     yourPet=JSON.stringify("");
     console.log("wrong");
}
//json=JSON.stringify(rows);
    //////////if
  });
}
/*--------------------page login----------------------------*/
//http://localhost:8080/login?name=pepi&password=123456
app.post('/login?',function(req,res){
    console.log("call post");
   res.setHeader('Content-Type', 'application/json');
   var getjson = getKeys(req.query);
  //var key = getjson[0] ; //name,pass
   var value = getjson[1];
var dataSplit = value.toString().split(',');
var name = dataSplit[0];
var pass = dataSplit[1];
  //var data = getValuejson(req.query,key);
//console.log("key="+name);
//console.log("value="+pass);
login(name,pass);
 res.send(json);
 console.log("json="+json);
});


function login(name,pass){
    
     connection.query('SELECT * FROM `user` WHERE name = "'+name+'" and pass="'+pass+'"', function(err, rows) {
     
    if (err){
    throw err;}
    else if(rows.length>0){
    namepath=JSON.stringify(name);
    console.log("true");
    console.log("namepath="+namepath);
}
else{
    console.log("wrong");
}

  });
    
}
 function getKeys(objectFromApi) {
var key = [];
var value = [];
for(var name in objectFromApi )
{
    if (objectFromApi.hasOwnProperty(name))
    {
      key.push(name);
      value.push(objectFromApi[name]);
      console.log(name + ': ' + objectFromApi[name]);
    }

}
  return [key , value] ;
}
/*-----------------------------------page regis--------------------------------------*/
app.post('/regis?',function(req,res){
    console.log("call regis");
   res.setHeader('Content-Type', 'application/json');
   var getjson = getKeys(req.query);
  //var key = getjson[0] ; //name,pass
   var value = getjson[1];
var dataSplit = value.toString().split(',');
var name = dataSplit[0];
var pass = dataSplit[1];
  //var data = getValuejson(req.query,key);
//console.log("key="+name);
console.log("name="+name);
console.log("pass="+pass);
regis(name,pass);
res.send(result_regis);
 //console.log("json="+json);
});


function regis(name,pass){
     
     connection.query('INSERT INTO `user`(`name`, `pass`) VALUES ("'+name+'","'+pass+'")', function(err, rows) {
     
    if (err){
          throw err;}
     else{
          console.log("regis finish");
          result_regis=JSON.stringify("true");
          namepath=JSON.stringify(name);
}
     });
}

app.get('/result_regis', function(req, res){
     console.log("result_regis="+result_regis);
     res.send(result_regis);
});
/*------------------------pet------------------------------*/

//SELECT time FROM pet WHERE pet_name='tom' LIMIT 3 
app.get('/Pet', function(req, res) {
     var getjson = getKeys(req.query);
    // var key = getjson[0] ; //name,pass
     var value = getjson[1];
     console.log("value="+value);
     //console.log("call page");
     getdata_yourPet(value);
     res.sendFile(path.join(__dirname + '/views/pages/pet.html'));
     console.log("call getdata_yourPet");
     //res.send(dataPet);
   }); 
function getdata_yourPet(namepet){
     var text = 'SELECT * FROM `pet` WHERE pet_name = "'+namepet+'" and user='+namepath;
     console.log(text);
     connection.query(text, function(err, rows) {
     
    if (err){
          throw err;}
     else{
          console.log("getdatapet");
          dataPet=JSON.stringify(rows);
          namepet_pet=namepet;
}
     });
}

app.get('/dataPet', function(req, res){
     getdata_yourPet(namepet_pet);
    console.log("send data");
     res.send(dataPet);
});

/*--------------------------create petch----------------------------*/

app.post('/createPet?',function(req,res){
    console.log("call regis");
   res.setHeader('Content-Type', 'application/json');
   var getjson = getKeys(req.query);
  //var key = getjson[0] ; //name,pass
   var value = getjson[1];
var dataSplit = value.toString().split(',');
var namePet = dataSplit[0];
var type = dataSplit[1];
  //var data = getValuejson(req.query,key);
//console.log("key="+name);
//console.log("name="+namepath);
//console.log("type="+type);
//regis(name,pass);
createPet(namePet,type);
res.send(NamePet);
 //console.log("json="+json);
});

function createPet(namePet,type){
     var text = 'INSERT INTO `pet`(`user`, `pet_name`, `type`, `exp`, `time`, `action`) VALUES ('+namepath+',"'+namePet+'","'+type+'",'+'"1",CURRENT_TIMESTAMP,"create pet")';
     
     console.log(text);
     
      connection.query(text, function(err, rows) {
     
    if (err){
          throw err;}
     else{
          console.log("createPet");
          NamePet=JSON.stringify(namePet);
}
     });
}
app.get('/namePet', function(req, res){
     console.log("yourPet"+NamePet);
     res.send(NamePet);
});

/*----------------------------feed---------------------------------------*/


app.post('/feed',function(req,res){
    console.log("feed");
   res.setHeader('Content-Type', 'application/json');
   var getjson = getKeys(req.query);
  //var key = getjson[0] ; //name,pass
   var value = getjson[1];
var dataSplit = value.toString().split(',');
var user = dataSplit[0];
var name = dataSplit[1];
var type = dataSplit[2];



  //var data = getValuejson(req.query,key);
//console.log("key="+name);
//regis(name,pass);
insertfeed(user,name,type);
res.send("true");
 //console.log("feed="+dataPet);
});
function insertfeed(user,name,type){
     var text  ='INSERT INTO `pet`(`user`, `pet_name`, `type`, `exp`, `time`, `action`) VALUES ("'+user+'","'+name+'","'+type+'",'+'"25",CURRENT_TIMESTAMP,"FEED")';
  //   var text = 'INSERT INTO `pet`(`user`, `pet_name`, `type`, `exp`, `time`, `action`) VALUES ('+ us  er+',"'+name+'","'+type+'",'+'"1 ",CURRENT_TIMESTAMP,"create pet")';

console.log(text);
connection.query(text, function(err, rows) {
     
    if (err){
          throw err;}
     else{
          console.log("feed true");
         // result_feed=JSON.stringify("true");
}
     });
}

/*----------------------------play---------------------------------------*/


app.post('/play',function(req,res){
    console.log("play");
   res.setHeader('Content-Type', 'application/json');
   var getjson = getKeys(req.query);
  //var key = getjson[0] ; //name,pass
   var value = getjson[1];
var dataSplit = value.toString().split(',');
var user = dataSplit[0];
var name = dataSplit[1];
var type = dataSplit[2];



  //var data = getValuejson(req.query,key);
//console.log("key="+name);
//regis(name,pass);
insertplay(user,name,type);
res.send("true");
});
function insertplay(user,name,type){

     var text = 'INSERT INTO `pet`(`user`, `pet_name`, `type`, `exp`, `time`, `action`) VALUES ("'+user+'","'+name+'","'+type+'",'+'"20",CURRENT_TIMESTAMP,"PLAY")';
console.log(text);
connection.query(text, function(err, rows) {
     
    if (err){
          throw err;}
     else{
          console.log("play");
         //result_play=JSON.stringify("true");
}
     });
}




/*--------------------------------------------------------------------------------*/

app.listen(8080);
console.log('8080 is the magic port');