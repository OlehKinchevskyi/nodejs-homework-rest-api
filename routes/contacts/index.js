const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts')

const {
  validationQueryContact,
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationObjectId,
} = require('./valid-contact-router');
const guard = require('../../helper/guard');
const subscription = require('../../helper/subscription');
const { UserSubscription } = require('../../helper/constants');

const handleError = require('../../helper/handle-error')

router.get('/', guard, validationQueryContact, ctrl.listContacts);

router.get('/starter', guard, subscription(UserSubscription.STARTER), ctrl.onlySTARTER);

router.get('/pro', guard, subscription(UserSubscription.PRO), ctrl.onlyPRO);

router.get('/business', guard, subscription(UserSubscription.BUSINESS), ctrl.onlyBUSINESS);

router.get('/:contactId', guard, validationObjectId, ctrl.getContactById);

router.post('/', guard, validationCreateContact, handleError, ctrl.addContact);

router.delete('/:contactId', guard, validationObjectId, ctrl.removeContact);

router.patch('/:contactId', guard, validationObjectId, validationUpdateContact, ctrl.updateContact);

router.patch(
  '/:contactId/favorite', guard, validationObjectId, validationUpdateStatusContact, ctrl.updateStatusContact
);



module.exports = router;