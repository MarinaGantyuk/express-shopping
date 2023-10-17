const express = require("express");
const app = express();
app.use(express.json());

const items = require("./fakedb.js");

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  let item = req.body;
  items.push(item);
  res.json({
    added: item,
  });
});

app.get("/items/:name", (req, res) => {
  let name = req.params.name;
  let item = items.find((item) => item.name == name);
  if (item) {
    res.json(item);
  } else {
    res.status(400).send(name + " not found");
  }
});

app.patch("/items/:name", (req, res) => {
  let name = req.params.name;
  let newitem = req.body;
  let index = items.findIndex((item) => item.name == name);
  if (index >= 0) {
    items[index] = newitem;
    res.json({
      updated: newitem,
    });
  } else {
    res.status(404).send(name + " not found");
  }
});

app.delete("/items/:name", (req, res) => {
  let name = req.params.name;
  let index = items.findIndex((item) => item.name == name);
  if (index >= 0) {
    items.splice(index, 1);
    res.json({
      message: "Deleted",
    });
  } else {
    res.status(400).send(name + " not found");
  }
});

module.exports = app;

// app.listen(3000, () => {
//   console.log("working");
// });
