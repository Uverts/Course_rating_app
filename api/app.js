import { Application, Router } from './deps.js'
import { authMiddleware } from './middleware/authMiddleware.js'
import { handleLogIn, handleSignUp } from './controllers/userController.js'
import {
  handleGetCourse, 
  handleGetCourses, 
  handleSearch, 
  handleAddFeedback,
} from './controllers/courseController.js'

const router = new Router()
router.get('/search/:query', handleSearch)
router.get('/search/', handleGetCourses)
router.get('/courses/:courseCode', handleGetCourse)
router.post('/feedback', handleAddFeedback)
router.post('/signup', handleSignUp)
router.post('/login', handleLogIn)

const app = new Application()
app.use(authMiddleware)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: 7777 })
