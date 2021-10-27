import express, { Request, Response, NextFunction } from 'express'
import { CreateUser } from '../controllers/AdminController'
import { AddProject, DeleteProject, GetProjects, GetUserProfile, UserLogin } from '../controllers/UserController'
import { Authenticate } from '../middlewares/CommonAuth'

const router = express.Router()

router.post('/register', CreateUser)
router.post('/login', UserLogin)

router.use(Authenticate)
router.get('/profile', GetUserProfile)
//router.patch('/profile', Update)
//router.patch('/service', Update)

router.post('/project', AddProject)
router.get('/projects', GetProjects)
router.delete('/project/:id', DeleteProject)



export { router as UserRoute }