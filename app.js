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
app.get("/courses", (req, res) => {
    let courses = JSON.parse(fs.readFileSync("database/courses.json"));
    let { code, num } = req.query;
    if (code) {
      courses = courses.filter((course) => course.code === code);
    }
    if (num) {
      if (num.length === 4) {
        courses = courses.filter((course) => course.num === num);
      } else if (num.length === 1) {
        courses = courses.filter((course) => course.num[0] === num);
      }
    }
    res.json(courses);
  });
   
// Get/account/:d
app.get("/account/:id", (req,res) => {
    const users = JSON.parse(fs.readFileSync("database/users.json"));
    const id = req.params.id;
    const user = users.find((user) => user.id === id);

    if (user) {
        // Remove the password property from the user object
        const { password, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// Post /users/signup
app.post("/users/signup", (req, res) => {
    const users = JSON.parse(fs.readFileSync("database/users.json"));
    const { username, password } = req.body;
    const newUser = {
        username,
        password,
        id: uuidv4(),
        courses: [],
    };
    users.push(newUser);
    fs.writeFileSync("database/users.json", JSON.stringify(users, null, 2));
    res.status(201).json({ message: "User created", id: newUser.id });
});


  
    
//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = app;
