const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const htmlpdf = require("html-pdf");

const writeFileAsync = util.promisify(fs.writeFile);

return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "checkbox",
      message: "what is your favorite color?",
      name: "colors",
      choices: [
        "green", 
        "blue", 
        "pink", 
        "red",
      ]

    },
  ]).then(function(answers){
    // console.log(answers);
    const queryUrl = `https://api.github.com/users/${answers.github}`;

    axios.get(queryUrl).then(function(response){
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
            <img class="avatar" src="${response.data.avatar_url}" alt="github avatar">
            <p> My username is: ${answers.github} </p>
            <p> My Location is: ${response.data.location} </p>
            <p> visit my profile: ${response.data.html_url}</p>
            <p> My blog:  ${response.data.blog} </p>
            <p> My bio: ${response.data.bio} </p>
            <p> My public repos:  ${response.data.public_repos} </p>
            <p> Followers:  ${response.data.followers} </p>
            <p> Following:  ${response.data.following} </p>
            </div>
        </div>
        </body>
        </html>`
        
        htmlpdf.create(html).toFile("./test.pdf", function(err, res){
            // console.log(res.filename);
            if (err) {
              return console.log(err);
            }
        
            console.log("Success!");
        
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
