const signUpService = require('../../services/cognito/signup_service');

module.exports = async function signupUseCase(req, res) {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(500).send({ error: 'Bad request' });
  }

  try {
    const response = await signUpService({ username, password, email });
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};
