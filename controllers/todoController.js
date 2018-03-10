import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://test:test@ds117858.mlab.com:17858/todolist');

const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

export default app => {
  app.get('/todo', (req, res) => {
    Todo.find({}).sort({ _id: -1 }).exec((err, data) => {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    // create new document
    Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    Todo.find({ item: req.params.item.replace(/-/g, ' ') })
      .remove((err, data) => {
        if (err) throw err;
        res.send(data);
      });
  });
  
  app.get('*', (req, res) => {
    res.send('404 Not Found');
  });
};
