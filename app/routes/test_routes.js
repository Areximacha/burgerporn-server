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

  router.get(`${path}`, (req, res) => {
    Note.find((err, notes) => {
      if (err)
        res.send(err)

      res.json(notes)
    })
  })

  router.get(`${path}/:id`, (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err)
        res.send(err)
      
      res.json(note)
    })
  })

  router.put(`${path}/:id`, (req, res) => {
    // shouldn't need to recast the body keys and db schema if done properly
    const note = { text: req.body.body, title: req.body.title }

    Note.findByIdAndUpdate(req.params.id, note, (err, response) => {
      if (err)
        res.send(err)

      res.json({ message: 'Note updated!' })
    })
  })

  router.delete(`${path}/:id`, (req, res) => {
    Note.findByIdAndRemove(req.params.id, (err, response) => {
      if (err)
        res.send(err)

      res.json({ message: 'Note deleted!' })
    })
  })

  return router
}
