const { log } = require('console');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const { ghDbConnect } = require('./models/db_mongo');

const registeredUserRouter = require('./routers/registeredUserRouter');
const publicRouter = require('./routers/publicRouter');
const adminRouter = require('./routers/adminRouter');
const DataRouter = require('./routers/dataRouter');

ghDbConnect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('port', process.env.PORT || 4500);

const server = app.listen(app.get('port'), () => {
  log(`app is listening on port ${app.get('port')}`);
});

const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: 'http://dci-lap:5900/',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected :' + socket.id);
  socket.on('browserEvent', (data) => {
    console.log(data.message);
    //socket.emit (choose a client)
    //io.emit (choose all clients)
    //socket.broadcast.emit (choose all clients except the one who sent the event)
    const killInterval = setInterval(function () {
      io.emit('raspEvent', Math.random());
      console.log('message sent to the Raspberry');
    }, 3000);

    setTimeout(() => {
      clearInterval(killInterval);
      console.log('interval cleared');
    }, 5 * 3000);
  });

  socket.on('serverEventRasp', (data) => {
    console.log('event from raspberry has received');
    console.log(data);
    io.emit('serverEventToBrowser', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
////////////////////////////////////////////////////////////////////////////////
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
app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap')));
app.use(express.static(path.join(__dirname, 'node_modules', 'jquery')));

app.use(publicRouter);
app.use('/user', registeredUserRouter);
app.use('/admin', adminRouter);
app.use('/data', DataRouter);
app.use('*', (req, res) => {
  res.render('404');
});
