const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : false
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({
      status: 'success',
      code: 200,
      data: contacts,
    })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : false
    const contact = await Contacts.getById(userId, req.params.id)
    if (contact) {
      return res.json({
      status: 'success',
      code: 200,
      data: contact,
      })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
      })
    }
    } catch (err) {
      next(err)
    }
  }

const create = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : false
    const contact = await Contacts.create(userId, req.body)
    
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Contact add',
      data: contact,
    })
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : false
    const contact = await Contacts.updateContact(userId, req.params.id, req.body)
    if (contact) {
      return res.json({
    status: 'success',
    code: 200,
    data: contact,
    })
    } else {
      return res.status(404).json({
    status: 'error',
    code: 404,
    data: 'Not Found',
  })
  }
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : false
      const contact = await Contacts.removeContact(userId, req.params.id)
      if (contact) {
        return res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
      data: contact,
      })
      } else {
        return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
    })
    }
    } catch (err) {
      next(err)
    }
}

const updateFavorite = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : false
      const contact = await Contacts.updateContact(userId, req.params.id, req.body)
      if (contact) {
        return res.json({
      status: 'success',
      code: 200,
      data: contact,
      })
      } else {
        return res.status(404).json({
      status: 'error',
      code: 404,
      data: 'Not Found',
    })
    }
    } catch (err) {
      next(err)
    }
}

const subscriptionStarter = async (req, res, next) => {
  return res.json({
  status: 'success',
  code: 200,
  data: { message: 'Starter only!', },
  })
}

const subscriptionPro = async (req, res, next) => {
  return res.json({
  status: 'success',
  code: 200,
  data: { message: 'Pro only!', },
  })
}

const subscriptionBusiness = async (req, res, next) => {
  return res.json({
  status: 'success',
  code: 200,
  data: { message: 'Business only!', },
  })
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
    updateFavorite,
    subscriptionStarter,
    subscriptionPro,
    subscriptionBusiness
}