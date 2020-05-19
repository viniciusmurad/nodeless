const signInService = require('../../services/cognito/signin_service');

module.exports = async function signinUseCase(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(500).send({ error: 'Bad request' });
  }

  try {
    const response = await signInService({ username, password });
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};
