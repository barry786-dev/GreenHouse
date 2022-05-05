const { log } = require('console');
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const { ghDbConnect } = require('./models/db_mongo');
const { addUserProductData } = require('./controllers/db_userProduct_Handlers');

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
    origin: 'http://dci-lap:5900/', //change this to your web domain https://gadeden.coding-school.org/
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected :' + socket.id);
  socket.on('browserEvent', (data) => {
    //listen to message from browser liveChat page
    console.log(data.message);
    //socket.emit (choose a client)
    //io.emit (choose all clients)
    //socket.broadcast.emit (choose all clients except the one who sent the event)
    const killInterval = setInterval(function () {
      io.emit('raspEvent', Math.random()); //send data to raspberry pi
      console.log('message sent to the Raspberry');
    }, 3000);

    setTimeout(() => {
      clearInterval(killInterval);
      console.log('interval cleared');
    }, 5 * 3000);
  });

  socket.on('serverEventRasp', (data) => {
    //listen to message from raspberry pi
    console.log('event from raspberry has received');
    console.log(data);
    io.emit('serverEventToBrowser', data); //send data to browser liveChat page
  });
  /////Pump events
  socket.on('pumpEventBrowserToServer', (data) => {
    //listen to message from browser userControllers page
    console.log('event from pump has received');
    console.log(data);
    io.emit('pumpEventServerToRasp', data); //send data to raspberry pi
  });
  /* socket.on('PumpStatus', (data) => {
    console.log('event from pumpRasp has received');
    console.log(data);
    io.emit('pumpStatusServerToBrowser', data);
  }); */
  //Here we push new date values from the raspberry pi to the database User_Product
  socket.on('raspSensorsValues', (data) => {
    //console.log('event from raspSensorsValues has received');
    //console.log(data);
    const addNewSensorsValues = async () => {
      try {
        const result = await addUserProductData(data);
        //console.log('this is the result', result);
        if (result === 'UniqueCode') {
          console.log('deviceUniqueCode not found');
        } else if (result) {
          console.log({ message: 'done' });
          //res.json({ message: 'done' });
        } else {
          console.log(
            'a device  trying to write but its serial number is not exist in user product'
          );
          //res.json({ message: 'error' });
        }
      } catch (error) {
        console.log({ message: error.message });
        //res.json({ message: error.message });
      }
    };
    addNewSensorsValues();
  });
  //////////////////////////////////////////////////////////////////////////////////////////////
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
////////////////////////////////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, 'node_modules', 'bootstrap'))
);
app.use(
  '/jquery',
  express.static(path.join(__dirname, 'node_modules', 'jquery'))
);

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
function checkSession(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}
function checkAdminSession(req, res, next) {
  if (req.session.user && req.session.user.userType === 'admin') {
    next();
  } else {
    res.redirect('/');
  }
}
app.use(publicRouter);
app.use('/user', checkSession, registeredUserRouter);
app.use('/admin', checkAdminSession, adminRouter);
app.use('/data', DataRouter);
app.use('*', (req, res) => {
  res.render('404');
});
