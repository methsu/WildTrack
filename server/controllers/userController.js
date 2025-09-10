import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  })
}

// @desc    Register new user
// @route   POST /api/users/register
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please fill all required fields')
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400)
    throw new Error('Please provide a valid email address')
  }

  // Check if user exists
  const userExists = await User.findOne({ email: email.toLowerCase() })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  try {
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password
    })

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isAdmin: user.role === 'admin',
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(400)
    throw new Error(error.message || 'Invalid user data')
  }
})

// @desc    Login user
// @route   POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validate input
  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }

  // Find user and check password
  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isAdmin: user.role === 'admin',
    token: generateToken(user._id)
  })
})

// @desc    Get user profile
// @route   GET /api/users/profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('favorites')
    .populate('visitHistory.exhibit')
    .select('-password')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isAdmin: user.role === 'admin',
    favorites: user.favorites,
    visitHistory: user.visitHistory
  })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // Validate email if being updated
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email.toLowerCase() })
    if (emailExists) {
      res.status(400)
      throw new Error('Email already in use')
    }
  }

  user.firstName = req.body.firstName?.trim() || user.firstName
  user.lastName = req.body.lastName?.trim() || user.lastName
  user.email = req.body.email?.toLowerCase().trim() || user.email

  if (req.body.password) {
    if (req.body.password.length < 6) {
      res.status(400)
      throw new Error('Password must be at least 6 characters')
    }
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    email: updatedUser.email,
    role: updatedUser.role,
    isAdmin: updatedUser.role === 'admin',
    token: generateToken(updatedUser._id)
  })
})

// @desc    Get user favorites
// @route   GET /api/users/favorites
export const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('favorites')
    .select('favorites')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json(user.favorites)
})

// @desc    Add animal to favorites
// @route   POST /api/users/favorites/:animalId
export const addFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const animalId = req.params.animalId

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (user.favorites.includes(animalId)) {
    res.status(400)
    throw new Error('Animal already in favorites')
  }

  user.favorites.push(animalId)
  await user.save()

  const updatedUser = await User.findById(user._id)
    .populate('favorites')
    .select('favorites')

  res.json(updatedUser.favorites)
})

// @desc    Remove animal from favorites
// @route   DELETE /api/users/favorites/:animalId
export const removeFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const animalId = req.params.animalId

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (!user.favorites.includes(animalId)) {
    res.status(400)
    throw new Error('Animal not in favorites')
  }

  user.favorites = user.favorites.filter(id => id.toString() !== animalId)
  await user.save()

  const updatedUser = await User.findById(user._id)
    .populate('favorites')
    .select('favorites')

  res.json(updatedUser.favorites)
})

// @desc    Get visit history
// @route   GET /api/users/visit-history
export const getVisitHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('visitHistory.exhibit')
    .select('visitHistory')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  res.json(user.visitHistory)
})

// @desc    Add visit history
// @route   POST /api/users/visit-history
export const addVisitHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { exhibitId } = req.body

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (!exhibitId) {
    res.status(400)
    throw new Error('Exhibit ID is required')
  }

  user.visitHistory.push({
    exhibit: exhibitId,
    date: new Date()
  })
  await user.save()

  const updatedUser = await User.findById(user._id)
    .populate('visitHistory.exhibit')
    .select('visitHistory')

  res.json(updatedUser.visitHistory)
})

// @desc    Get all users (admin only)
// @route   GET /api/users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .select('-password')
    .sort({ createdAt: -1 })

  res.json(users)
})

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (user.role === 'admin') {
    res.status(400)
    throw new Error('Cannot delete admin user')
  }

  await user.deleteOne()
  res.json({ message: 'User removed successfully' })
})

export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
  getVisitHistory,
  addVisitHistory,
  getAllUsers,
  deleteUser
}