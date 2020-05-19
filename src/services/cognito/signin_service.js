const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const settings = require('../../config/settings')
global.fetch = require('node-fetch');

module.exports = function signInService ({username, password }) {
  const poolData = {
    UserPoolId: settings.COGNITO.USER_POOL_ID,
    ClientId: settings.COGNITO.CLIENT_ID,
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
  return new Promise ((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  })
}
