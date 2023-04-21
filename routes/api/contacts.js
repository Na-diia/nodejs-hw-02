const express = require('express');

const {getAllContacts, 
      getOneContactById, 
      addOneContact,
      deleteContact, 
      innovateContact,
      updateStatusContact,
} = require('../../controllers/contacts');

const {updateValidation, addValidation, validateFavoriteField, validateId } = require('../../middlewares/validateData');
const {authenticate} = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, getAllContacts);

router.get('/:contactId', authenticate, validateId, getOneContactById);

router.post('/', authenticate, addValidation, addOneContact);

router.delete('/:contactId', authenticate, validateId, deleteContact);

router.put('/:contactId', authenticate, validateId ,updateValidation, innovateContact);

router.patch('/:contactId/favorite', authenticate, validateId , validateFavoriteField, updateStatusContact);

module.exports = router;