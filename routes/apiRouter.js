const express = require('express')
const router = express.Router()
const Contact = require('../models/contact')

// get request for all contacts
router.get('/', async (req, res) => {
  try {
    const allContacts = await Contact.find()
    res.send(allContacts)
  } catch (err) {
    console.error(err)
  }
})

// get a single contact based on id
router.get('/:id', getContactByID, async (req, res) => {
  res.send(res.contact)
})

// post a single COntact
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })

  try {
    const newContact = await contact.save()
    res.send(newContact)
  } catch (err) {
    console.error(err)
  }
})

// delete a single contact
router.delete('/:id', getContactByID, async (req, res) => {
  try {
    await res.contact.remove()
    res.json({ message: 'contact deleted' })
  } catch (err) {
    res.status(500).json({ message: message.err })
  }
})

// save specific only the paramters we send in req.body
router.patch('/:id', getContactByID, async (req, res) => {
  if (req.body.name != null) {
    res.contact.name = req.body.name
  }

  if (req.body.email != null) {
    res.contact.email = req.body.email
  }

  if (req.body.message != null) {
    res.contact.message = req.body.message
  }

  try {
    const updatedContact = await res.contact.save()
    res.send(updatedContact)
  } catch (err) {
    res.status(500).json({ message: message.err })
  }
})

//middleware to get full contact by an ID
async function getContactByID(req, res, next) {
  let contact
  try {
    contact = await Contact.findById(req.params.id)
    if (contact === null) {
      res.send('contact not found')
    }
  } catch (err) {
    console.error(err)
  }

  res.contact = contact
  next()
}

module.exports = router
