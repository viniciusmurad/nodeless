const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const settings = require('../../config/settings')
global.fetch = require('node-fetch');

module.exports = function signUpService({ username, password, email }) {
  const poolData = {
    UserPoolId: settings.COGNITO.USER_POOL_ID,
    ClientId: settings.COGNITO.CLIENT_ID,
  };

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

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const cognitoUser = result.user;
      resolve(cognitoUser);
    });
  });
};
