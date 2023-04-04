const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Creating Routes to store Users Data inside /models/Users folder
const Place = require('./models/Place'); // Creating Routes to store Places Data inside /models/Place folder
const Booking = require('./models/Booking');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs'); //Files system library
require('dotenv').config(); // This will load all our enviroment variables from .env

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
tokenSecret = 'fsdafhasdjkfsdfasdkjfkla';

// The app.use() function adds a new middleware to the app. Essentially, whenever a request hits your backend, Express will execute the functions you passed to app.use()
// Express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json()); // Setup server to accept JSON
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, tokenSecret, {}, (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}

app.get('/test', (req, res) => {
  res.json('test Ok');
});

app.post('/register', async (req, res) => {
  const { name, location, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      location,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passCheck = bcrypt.compareSync(password, userDoc.password);
    if (passCheck) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        tokenSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('Pasword not Ok');
    }
  } else {
    res.status(422).json('Not Found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, tokenSecret, {}, async (err, user) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(user.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json({});
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

/////////////////
// Upload by Link
app.post('/upload-by-link', async (req, res) => {
  const { Link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  // console.log('Destination: ', __dirname + '/uploads/' + newName);
  await imageDownloader.image({
    url: Link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

///////////////////
// Upload by file
const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]; // Destructure the path & originalname from the files
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]; //
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

// API for Uploading New Place Data
app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, tokenSecret, {}, async (err, user) => {
    if (err) throw err;
    try {
      const placeData = await Place.create({
        owner: user.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(placeData);
    } catch (err) {
      res.status(422).json(err);
    }
  });
});

//Sending the Place Data From Database to UI , on Get'/places' Call
app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, tokenSecret, {}, async (err, user) => {
    const { id } = user;
    res.json(await Place.find({ owner: id }));
  });
});

//Sending the Place Data From Database to UI , on Get'/places/id' Call
//This will fill the forms from the existing data on specific id
// This will also provide Place Data to PlaceDisplay Page.
app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

//Allow to Update the Place Data of id
app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, tokenSecret, {}, async (err, user) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      placeDoc.save();
      res.json('OK');
    }
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

//  Creating Booking Using Booking Card
app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuest, name, mobile, price } =
    req.body;
  Booking.create({
    user: userData.id,
    place: place,
    checkIn,
    checkOut,
    numberOfGuest,
    name,
    mobile,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/bookings/data', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});


export default app;
// app.listen(4000);
