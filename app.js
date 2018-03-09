import express from 'express';
import todoController from './controllers/todoController';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// fire controllers
todoController(app);

app.listen(process.env.PORT || 3000);