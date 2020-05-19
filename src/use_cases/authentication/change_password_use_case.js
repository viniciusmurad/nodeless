const changePasswordService = require('../../services/cognito/change_password_service');

module.exports = async function changePasswordUseCase(req, res) {
  const { username, password, newPassword } = req.body;
  if (!username || !password || !newPassword) {
    return res.status(500).send({ error: 'Bad request' });
  }

  try {
    const response = await changePasswordService({ username, password, newPassword });
    return res.status(200).send(response);
  } catch (err) {
    return res.status(400).send(err);
  }
};
