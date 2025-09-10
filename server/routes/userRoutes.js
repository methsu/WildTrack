import express from 'express'
import { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile,
    getAllUsers,
    deleteUser,
    addFavorite,
    removeFavorite,
    addVisitHistory,
    getFavorites,
    getVisitHistory
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Protected routes
router.use(protect) // Apply protection middleware to all routes below

// Profile routes
router.route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile)

// Favorites routes
router.route('/favorites')
    .get(getFavorites)
router.route('/favorites/:animalId')
    .post(addFavorite)
    .delete(removeFavorite)

// Visit history routes
router.route('/visit-history')
    .get(getVisitHistory)
    .post(addVisitHistory)

// Admin routes
router.use(admin) // Apply admin middleware to all routes below
router.route('/')
    .get(getAllUsers)

router.route('/:id')
    .delete(deleteUser)

export default router