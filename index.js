const express = require("express");
var app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let todos = [
	{ id: 1, text: "Brush teeth", completed: false },
	{ id: 2, text: "Pet dog", completed: false },
	{ id: 3, text: "Make Coffee", completed: false },
	{ id: 4, text: "Write code", completed: false },
];

app.get("/todos", (_, res) => {
	return res.status(200).send(todos);
});

app.get("/todos/:id", function (req, res) {
	const { id } = req.params;
	const todo = todos.find((todo) => todo.id === parseInt(id, 10));
	if (!todo) return res.status(418).send({ error: "todo not found" });

	return res.status(200).send(todo);
});

app.post("/todos/", function (req, res) {
	const { text } = req.body;
	if (!text)
		return res.status(400).send({ error: "text is a required parameter" });
	const id = todos.length + 1;
	const newTodo = {
		id,
		text,
		completed: false,
	};
	todos.push(newTodo);

	return res.status(201).send(todos);
});

app.delete("/todos/:id", function (req, res) {
	const { id } = req.params;
	let index = todos.findIndex((todo) => {
		return todo.id == id;
	});
	todos.splice(index, 1);

	return res.status(204).send(todos);
});

app.put("/todos/", function (req, res) {
	let todoToUpdate = todos.find((todo) => {
		return todo.id == req.body.id;
	});

	todoToUpdate = {
		id: req.body.id,
		text: req.body.text,
		completed: req.body.completed,
	};

	let index = todos.findIndex((todo) => {
		return todo.id == req.body.id;
	});

	todos[index] = todoToUpdate;

	return res.status(204).send(todos);
});

app.patch("/todos/:id", function (req, res) {
	const { id } = req.params;
	let todoToUpdate = todos.find((todo) => {
		return todo.id == id;
	});

	todoToUpdate = {
		id: todoToUpdate.id,
		text: req.body.text || todoToUpdate.text,
		completed: req.body.completed || false,
	};

	let index = todos.findIndex((todo) => {
		return todo.id == req.body.id;
	});

	todos[index] = todoToUpdate;

	return res.status(204).send(todos);
});

app.listen(PORT, () =>
	console.log(`Server running in http://localhost:${PORT}`)
);
