const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validationQueryContact,
  validationCreateContact,
  validationPutContact,
  validationPatchContact,
  validationObjectId} = require('../contacts/valid-contact-router')
const guard = require('../../helper/guard')
const subscription = require('../../helper/subscription')
const { Subscription } = require('../../helper/constants')

router.get('/', guard, validationQueryContact, ctrl.getAll)
      .post('/', guard, validationCreateContact, ctrl.create)

router.get('/starter', guard, subscription(Subscription.STARTER), ctrl.subscriptionStarter)
router.get('/pro', guard, subscription(Subscription.PRO), ctrl.subscriptionPro)
router.get('/business', guard, subscription(Subscription.BUSINESS), ctrl.subscriptionBusiness)

router.get('/:id', guard, validationObjectId, ctrl.getById)
      .delete('/:id', guard, ctrl.remove)
      .put('/:id', guard, validationPutContact, ctrl.update)

router.patch('/:id/favorite', guard, validationPatchContact, ctrl.updateFavorite)

module.exports = router
