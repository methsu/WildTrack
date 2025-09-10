import Animal from '../models/Animal.js'

// @desc    Get all animals
// @route   GET /api/animals
// @access  Public
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().populate('exhibit')
    res.status(200).json(animals)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single animal
// @route   GET /api/animals/:id
// @access  Public
export const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('exhibit')
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' })
    }
    res.status(200).json(animal)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create animal
// @route   POST /api/animals
// @access  Private/Admin
export const createAnimal = async (req, res) => {
  try {
    const {
      name,
      species,
      age,
      category,
      habitat,
      diet,
      description,
      images,
      conservation,
      exhibit
    } = req.body

    // Validate required fields
    if (!name || !species || !age || !category || !habitat || !diet || !description || !exhibit) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    // Create animal with default values for optional fields
    const animal = new Animal({
      name,
      species,
      age,
      category,
      habitat,
      diet,
      description,
      images: images || [],
      conservation: {
        status: conservation?.status || 'Least Concern',
        population: conservation?.population || 'Unknown',
        threats: conservation?.threats || []
      },
      exhibit,
      schedule: []
    })

    const newAnimal = await animal.save()
    res.status(201).json(newAnimal)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update animal
// @route   PUT /api/animals/:id
// @access  Private/Admin
export const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' })
    }

    // Ensure conservation object structure is maintained
    if (req.body.conservation) {
      req.body.conservation = {
        ...animal.conservation,
        ...req.body.conservation
      }
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate('exhibit')

    res.status(200).json(updatedAnimal)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete animal
// @route   DELETE /api/animals/:id
// @access  Private/Admin
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' })
    }

    await animal.deleteOne()
    res.status(200).json({ message: 'Animal removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}