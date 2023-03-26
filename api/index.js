const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
tokenSecret = 'fsdafhasdjkfsdfasdkjfkla';

app.use(express.json());
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
        token.sign(
          { email: userDoc.email, id: userDoc._id },
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

app.listen(4000);

// XLPWZSZkFDqmz6lR
