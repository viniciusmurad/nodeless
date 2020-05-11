const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const { CognitoUserPool } = AmazonCognitoIdentity;
const AWS = require('aws-sdk');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const FormData = require('form-data');
global.fetch = require('node-fetch');

module.exports = (app) => {
  app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(500).send({ error: 'Bad request' });
    }
    const poolData = {
      UserPoolId: 'us-east-1_o0JLE1Pb5', // Your user pool id here
      ClientId: '4hd5m81fgbi2qt5koh4ov18alq', // Your client id here
    };
    const pool_region = 'us-east-1';
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const attributeList = [];
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'name',
        Value: username,
      })
    );
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    );
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err || err !== null) {
        return res.status(500).send({ error: err });
      }
      return res.status(201).send({ success: 'Successfully created user' });
    });
  });

  app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(500).send({ error: 'Bad request' });
    }
    const poolData = {
      UserPoolId: 'us-east-1_o0JLE1Pb5', // Your user pool id here
      ClientId: '4hd5m81fgbi2qt5koh4ov18alq', // Your client id here
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password,
      }
    );

    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        return res.status(200).send({
          access_token: result.getAccessToken().getJwtToken(),
          id_token: result.getIdToken().getJwtToken(),
          refresh_token: result.getRefreshToken().getToken(),
        });
      },
      onFailure(err) {
        return res.status(500).send({ error: err });
      },
    });
  });

  app.post('/change-password', async (req, res) => {
    const { username, password, newPassword } = req.body;
    if (!username || !password || !newPassword) {
      return res.status(500).send({ error: 'Bad request' });
    }

    const poolData = {
      UserPoolId: 'us-east-1_o0JLE1Pb5', // Your user pool id here
      ClientId: '4hd5m81fgbi2qt5koh4ov18alq', // Your client id here
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password,
      }
    );

    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        cognitoUser.changePassword(password, newPassword, (err, result) => {
          if (err) {
            return res.status(500).send({ error: err });
          }
          console.log(result);
          return res
            .status(200)
            .send({ success: 'Successfully changed password of the user' });
        });
      },
      onFailure(err) {
        return res.status(500).send({ error: err });
      },
    });
  });

  app.post('/pz', async (req, res) => {
    const url =
      'https://devtest11.pepblast.com/pzAlbums_php03/WAMSignup.php?client=HTML&app=COGNITO&version=1.0&build=1.1';
    const { username, password, email } = req.body;
    if (!username || !password || !email)
      return res.status(500).send({ error: 'Bad request' });

    const bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    bodyFormData.append('email', email);

    const response = await axios({
      method: 'post',
      url,
      data: bodyFormData,
    });
    if (response.status === 200) {
      return res.status(200).send({ success: response.data });
    }
    return res.status(400).send({ err: response.data });
  });
};
