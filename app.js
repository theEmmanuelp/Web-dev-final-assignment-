const express = require("express");
const fs = require("fs");
const app = express();
//All your code goes here

// serving static files
app.use(express.static("public"));



//Get/courses
    //should respond
app.get("/courses", (req, res) => {
    let Course = JSON.parse(fs.readFileSync("database/courses.json"));
    res.json(Course); 
})

app.get("/account/:id", (req,res) => {
    console.log(req.params.id);
})
    //should accept query parameters

  
    
//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = app;
