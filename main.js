
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/',  function(req,res){
    res.send('<b>Welcome to Sppu Online</b>')
})

app.get('/netra', function(req,res){
   fs.readFile('a.txt','utf-8', function(err,data){
    if(err){
        res.status(400).send('Error : File cannot be read or doesnt exits');
        return;
    }
        res.send(data);
   })}  
)

app.listen(3000);