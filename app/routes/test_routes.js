const express = require('express')
const router = express.Router()

const Note = require('../models/note')

module.exports = (path) => {
  router.post(`${path}`, (req, res) => {
    const note = new Note()
    note.title = req.body.title
    note.text = req.body.body

    note.save((err) => {
      if (err)
        res.send(err)

      res.json({ message: 'Note created!' })
    })

  })

  return router
}
