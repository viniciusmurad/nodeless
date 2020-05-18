const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', require('./use_cases/authentication/signin_use_case'));
app.post('/signup', require('./use_cases/authentication/signup_use_case'));
app.post(
  '/change-password',
  require('./use_cases/authentication/change_password_use_case')
);

app.get('/teste', function(req, res) {
  return res.status(200).send({message: 'Hello 2'});
})

module.exports = app;
