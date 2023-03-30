const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs'); //Files system library

const bcryptSalt = bcrypt.genSaltSync(10);
tokenSecret = 'fsdafhasdjkfsdfasdkjfkla';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

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

// Upload by Link
app.post('/upload-by-link', async (req, res) => {
  const { Link } = req.body;
  console.log('Link', Link);
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: Link,
    dest: __dirname + '/uploads/' + newName,
  });
  console.log('New Name', newName);
  res.json(newName);
});

// Upload by file
const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]; // Destructure the path & originalname from the files
    const parts = originalname.split('.');
    console.log(parts);
    const ext = parts[parts.length - 1]; //
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

app.listen(4000);
