const fs = require("fs/promises");// adds file system
const express = require("express");//adds a express which is a web application framework
var bodyParser = require("body-parser");// for parsing/processing files
const path = require("path");//links the file to html



let items = [];//initializing array

const app = express();//initializing variable app and assigning to express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//linking data to json

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/items", (req, res) => {
  res.send(items);
});

app.put("/items/:id", (req, res) => {
  const id = req.body.id;
  if (!id) {
    console.error("pass an id to edit");//for put functions, an id is required to edit a specific item
    return res.sendStatus(400);//status code 400... problem processing from client side
  }// no else statetement required because return exits the if statement

  res.json();//edit json file
});

app.post("/items", async (req, res) => {//post creates items to the json file
  const id = items.length + 1;//adds 1 because array counts from 0
  const content = req.body;

  console.log("content: ", content);
  if (!content) {
    return res.sendStatus(400);//status code 400 to show no content
  }
  const newData = { id: id, ...content };
  items.push(newData);
  console.log("items: ", items);//prints out items: mangoes eg;

  res.redirect("/");//This prevents the user/client from having to change tabs after every processing
  res.end();//ends the response
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));//sends the html file name imdex.html
});

app.delete("/items/:id", async (req, res) => {//function to delet items
  const { id } = req.params;
  const itemIdx = items.findIndex((item) => item.id == id);//compares the ids and deletes as required

  items.splice(itemIdx, 1);

  return res.send();
});

app.use(express.static(__dirname + "/public"));

app.listen(8080, () => console.log("API Server is running..."));//shows successful connections and the port which our data is connected
