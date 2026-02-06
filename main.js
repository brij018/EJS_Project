import express from "express";

const app = express();

let taskList = [
  {
    id: 1,
    title: "Learn Express",
  },
  {
    id: 2,
    title: "Build Task App",
  },
];

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { taskList });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: new Date().getTime(),
    title,
  };

  taskList.push(newTask);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json("Task not found");
  }

  res.render("edit", { task });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json("Task not found");
  }

  const { title } = req.body;
  task.title = title;

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  taskList = taskList.filter((t) => t.id !== id);
  res.redirect("/");
});

const port = 5000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
