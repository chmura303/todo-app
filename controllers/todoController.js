const Todo = require('../models/todo');

const todo_index = (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'Home', todos: result });
    })
    .catch(err => {
      console.log(err);
    });
};

const todo_post = (req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then(result => {
      res.redirect('/todos');
    })
    .catch(err => {
      console.log(err);
    });
};

const todo_delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/todos' });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  todo_index,
  todo_post,
  todo_delete,
};
