function BadRequestError (message) {
  this.name = 'BadRequestError'
  this.message = message || 'Bad request error'
  this.stack = (new Error()).stack
}

BadRequestError.prototype = new Error()

module.exports = BadRequestError
