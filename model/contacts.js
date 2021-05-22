const Contacts = require('./schemas/contact');

const listContacts = async () => {
    const results = await Contacts.find()
    return results
}

<<<<<<< Updated upstream:model/index.js
const getContactById = async id => {
  const result = await Contacts.findOne({_id: id})
    return result
};

const addContact = async body => {
  const result = await Contacts.create(body)
=======
const getById = async (userId, id) => {
  const result = await Contacts.findOne({_id: id, owner: userId}).populate({
    path: 'owner',
    select: 'name email subscription -_id',
    })
    return result
};

const create = async (userId, body) => {
  const result = await Contacts.create({...body, owner: userId})
>>>>>>> Stashed changes:model/contacts.js
  return result
};

const updateContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate({ _id: id }, {...body}, {new: true})
  return result
};

const updateStatusContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );

  return result;
};

const removeContact = async id => {
const result = await Contacts.findByIdAndRemove({_id: id})
    return result
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  create,
  updateContact,
  updateStatusContact,
};