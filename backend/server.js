const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// In-memory mock data
let tasks = [
  {
    id: '1',
    title: 'Sample Task',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Add a task
app.post('/tasks', (req, res) => {
  const { title, status } = req.body;
  const newTask = {
    id: (Date.now() + Math.random()).toString(),
    title,
    status: status || 'pending',
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks/:id - Get a task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// PUT /tasks/:id - Update task
app.put('/tasks/:id', (req, res) => {
  const { title, status } = req.body;
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (title !== undefined) task.title = title;
  if (status !== undefined) task.status = status;
  res.json(task);
});

// DELETE /tasks/:id - Delete task
app.delete('/tasks/:id', (req, res) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const deleted = tasks.splice(idx, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 