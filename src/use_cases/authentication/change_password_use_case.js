const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

module.exports = async function changePasswordUseCase(req, res) {
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
        return res
          .status(200)
          .send({ success: 'Successfully changed password of the user' });
      });
    },
    onFailure(err) {
      return res.status(500).send({ error: err });
    },
  });
  return res.status(500).send({ error: 'Something wrong' });
};
