const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const rfs = require('rotating-file-stream');
require('dotenv').config();

// const logger = require('./util/loggerEasy');
const logger = require('./util/logger');
const { stream } = logger;
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();

app.engine(
  'hbs',
  handlebars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page not found' });
});
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) throw err;
  logger.info(`Ready Listening on port ${port}`);
});
