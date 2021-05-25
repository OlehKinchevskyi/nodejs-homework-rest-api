const { HttpCode } = require('./constants')

const subscription = (subscription) => (req, res, next) => {
  const userSubscription = req.user.subscription
  if (userSubscription !== subscription) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: 'error',
      code: HttpCode.FORBIDDEN,
      message: 'Access is denied',
    })
  }
  return next()
}

module.exports = subscription