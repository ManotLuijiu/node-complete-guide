const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const rfs = require('rotating-file-stream');
require('dotenv').config();

// const logger = require('./util/loggerEasy');
const logger = require('./util/logger');
const { stream } = logger;
const morgan = require('morgan');
// const handlebars = require('express-handlebars');

const app = express();

// app.engine Using only for handlebars
// app.engine(
//   'hbs',
//   handlebars({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs',
//   })
// );
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { get404 } = require('./controllers/errors');

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs'),
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Morgan
morgan.token('th-date', function (req, res) {
  const date = new Date();
  return date;
});
app.use(morgan('common', { stream: accessLogStream }));
app.use(
  morgan(
    ':th-date :method[pretty] :url :status :res[content-length] - :response-time ms',
    {
      stream: stream,
    }
  )
);

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) throw err;
  logger.info(`Ready Listening on port ${port}`);
});
