import Exhibit from '../models/Exhibit.js'

// @desc    Get all exhibits
// @route   GET /api/exhibits
// @access  Public
export const getExhibits = async (req, res) => {
  try {
    const exhibits = await Exhibit.find().populate('animals')
    res.status(200).json(exhibits)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single exhibit
// @route   GET /api/exhibits/:id
// @access  Public
export const getExhibitById = async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id).populate('animals')
    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' })
    }
    res.status(200).json(exhibit)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create exhibit
// @route   POST /api/exhibits
// @access  Private/Admin
export const createExhibit = async (req, res) => {
  try {
    const exhibit = new Exhibit(req.body)
    const newExhibit = await exhibit.save()
    res.status(201).json(newExhibit)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update exhibit
// @route   PUT /api/exhibits/:id
// @access  Private/Admin
export const updateExhibit = async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id)
    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' })
    }

    const updatedExhibit = await Exhibit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.status(200).json(updatedExhibit)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete exhibit
// @route   DELETE /api/exhibits/:id
// @access  Private/Admin
export const deleteExhibit = async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id)
    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' })
    }

    await exhibit.remove()
    res.status(200).json({ message: 'Exhibit removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}