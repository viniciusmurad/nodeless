const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

module.exports = async function signinUseCase(req, res) {
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
       return res.status(400).send(err);
    },
  });
};
