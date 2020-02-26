const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const htmlpdf = require("html-pdf");


return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
  ]).then(function(answers){
    console.log(answers);

    axios.get("https://api.github.com/users/lromero5").then(function(response){
        console.log(response.data);
        var html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <title>Document</title>
          <style> 
          </style>
        </head>
        <body>
          <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">Hi! My name is ${answers.name}</h1>
            <p class="lead">I am from ${answers.location}.</p>
            <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
            <ul class="list-group">
              <li class="list-group-item">My GitHub username is ${answers.github}</li>
              <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
            </ul>
          </div>
        </div>
        </body>
        </html>`
        
        htmlpdf.create(html).toFile("./test.pdf", function(err, res){
            console.log(res.filename);
          });
    

    //     fs.writeFile('test.pdf', pdf, function(err){
    //         console.log(err);
    //     })    
    })
  })





//starter code
// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();
