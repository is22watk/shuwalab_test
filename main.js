var express = require('express');
var ejs = require("ejs");
  
var app = express();
  
app.engine('ejs',ejs.renderFile);

// 必要なcssやjsのファイルはpublicの下に配置する
app.use(express.static('public/'));
  
app.get("/", function(req, res){
    res.render('home.ejs');
});
  
var server = app.listen(3001, function(){
    console.log('ServerStart');
})