import express, { Request, Response, NextFunction } from 'express'
import { CreateUser } from '../controllers/AdminController'
import { GetUserProfile, UserLogin } from '../controllers/UserController'
import { Authenticate } from '../middlewares/CommonAuth'

const router = express.Router()

router.post('/register', CreateUser)
router.post('/login', UserLogin)

router.use(Authenticate)
router.get('/profile', GetUserProfile)




export { router as UserRoute }