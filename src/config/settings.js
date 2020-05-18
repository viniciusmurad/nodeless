module.exports = {
  get REGION () { return process.env.REGION },
  get STAGE () { return process.env.STAGE },
  get COGNITO () { return { USER_POOL_ID: process.env.USER_POOL_ID, CLIENT_ID: process.env.CLIENT_ID } }
}
