const Contacts = require('../model');

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contacts = await Contacts.listContacts(userId, req.query);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
     const userId = req.user?.id;
    const contact = await Contacts.addContact(userId, req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
     const userId = req.user?.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
     const userId = req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
       const userId = req.user?.id;
    const contact = await Contacts.updateStatusContact(
        userId,
        req.params.contactId,
        req.body,
      );

      if (contact) {
        return res.status(201).json({
          status: 'success',
          code: 201,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        });
      }
    } catch (error) {
      next(error);
    }
};

const onlySTARTER = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'only Starter',
    },
  });
};

const onlyPRO = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only Pro',
    },
  });
};

const onlyBUSINESS = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only Business',
    },
  });
};
  
module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
    onlySTARTER,
    onlyPRO,
    onlyBUSINESS
    
}