var express = require('express');
var app = express();
var json2xls = require('json2xls');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
jsonParser = bodyParser.json();

app.use(cors());

app.post('/',jsonParser,function(req,res){
	var data  = req.body;
	var xls = json2xls(data);
	fs.writeFileSync('data.xlsx',xls,'binary');
	res.status(200).end();
});

app.get('/data',function (req,res) {
	res.download('data.xlsx');
	setTimeout(function() { fs.unlinkSync('data.xlsx')},5000); //DELETE THE FILE
});

app.listen(5000,function(){
	console.log("APP LISTENING ON PORT 5000");
});