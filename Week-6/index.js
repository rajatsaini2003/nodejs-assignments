const express = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());

const PORT = 3000;

let userList = [];

// create
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: uuidv4(), name, email };
  userList.push(newUser);
  res.status(201).json(newUser);
});

// read all
app.get('/api/users', (req, res) => {
  res.json(userList);
});

// read by id
app.get('/api/users/:id', (req, res) => {
  const user = userList.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// update
app.put('/api/users/:id', (req, res) => {
  const userIndex = userList.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  const { name, email } = req.body;
  userList[userIndex] = { ...userList[userIndex], name, email };
  res.json(userList[userIndex]);
});

// delete
app.delete('/api/users/:id', (req, res) => {
  const userIndex = userList.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = userList.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
