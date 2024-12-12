const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();

// Configure CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(
  'mongodb+srv://reddyvijay1690:NOkMx7vpgsPdml9F@cluster0.ilbtpvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todo/TODO',
  () => console.log('MongoDB connected')
);

app.listen(5000, () => console.log('Server listening on port: 5000'));

app.post('/add', (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.get('/get', (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  TodoModel.findByIdAndUpdate(id, { task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = app;
