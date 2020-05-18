const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');


module.exports = async function signupUseCase(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(500).send({ error: 'Bad request' });
  }
  const poolData = {
    UserPoolId: 'us-east-1_o0JLE1Pb5', // Your user pool id here
    ClientId: '4hd5m81fgbi2qt5koh4ov18alq', // Your client id here
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
  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err || err !== null) {
      return res.status(500).send({ error: err });
    }
    return res.status(201).send({ success: 'Successfully created user' });
  });
};
