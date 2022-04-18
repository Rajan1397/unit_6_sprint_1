const express = require("express");

const books = require("./book.json");

const app = express();

const filepath = {};

function logger(req, res, next) {
  console.log(req.url);
  next();
}

app.get("/", (req, res) => {
  res.send(
    "This is the book API, try to fetch data for any book, with given API struure"
  );
});

function checkpermission(req, res, next) {
  if (req.url === "/authors") {
    filepath["route"] = "/authors";
    filepath["permission"] = true;
  }
  if (req.url === "/libraries") {
    filepath["route"] = "/libraries";
    filepath["permission"] = true;
  }
  next();
}

app.use(logger);

app.get("/books", (req, res, next) => {
  res.json(books);

  res.send({ route: "/books" });
});
app.get("/libraries", checkpermission, (req, res, next) => {
  res.send(filepath);
  next();
});
app.get("/authors", checkpermission, (req, res, next) => {
  res.send(filepath);
  next();
});

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});
