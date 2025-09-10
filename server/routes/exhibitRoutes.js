import express from 'express'
import {
  getExhibits,
  getExhibitById,
  createExhibit,
  updateExhibit,
  deleteExhibit
} from '../controllers/exhibitController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getExhibits)
router.get('/:id', getExhibitById)

// Protected admin routes
router.use(protect, admin)
router.post('/', createExhibit)
router.put('/:id', updateExhibit)
router.delete('/:id', deleteExhibit)

export default router