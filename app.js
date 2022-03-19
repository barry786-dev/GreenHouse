const { log } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const registeredUserRouter = require('./routers/registeredUserRouter');
const publicRouter = require('./routers/publicRouter');

app.set('port', process.env.PORT || 4500);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'green houses',
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', registeredUserRouter);
app.use(publicRouter);

app.listen(app.get('port'), () => {
  log(`app is listening on port ${app.get('port')}`);
});
