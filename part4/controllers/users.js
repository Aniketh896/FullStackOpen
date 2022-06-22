const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).json({
      // eslint-disable-next-line quotes
      error: `${!username ? 'username' : 'password'} must be provided`
    })
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      // eslint-disable-next-line quotes
      error: `${username.length < 3 ? 'username' : 'password'} must be longer than 3 characters`
    })
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (_request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users)
})

module.exports = usersRouter