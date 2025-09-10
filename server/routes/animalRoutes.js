import express from 'express'
import {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
} from '../controllers/animalController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getAnimals)
router.get('/:id', getAnimalById)

// Protected admin routes
router.use(protect, admin)
router.post('/', createAnimal)
router.put('/:id', updateAnimal)
router.delete('/:id', deleteAnimal)

export default router