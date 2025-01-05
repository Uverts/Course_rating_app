import { createUser, login, getUser } from '../services/usersService.js'
import { create as createJwt } from '../deps.js'
import { config } from '../config/config.js'
import { z } from '../deps.js'

const userValidator = z.object({
    username: z.string().min(1).max(15), 
    password: z.string().min(5).max(30),
})
  
export const handleSignUp = async (context) => {
  try {
    const userData = await context.request.body().value
    const validationRes = userValidator.safeParse(userData)
    if (!validationRes.success) {
      context.response.status = 400
      return
    }
    const {username, password } = userData
    const userExist = await getUser(username)
    if (userExist.length > 0) {
      context.response.status = 409
      return 
    }
    const userId = await createUser(username, password)
    const jwtPayload = {userId, username: username}
    const jwt = await createJwt(config.jwtHead, jwtPayload, config.jwtSecret)
    context.response.headers.set('Authorization', `Bearer ${jwt}`)
    context.response.status = 201
  } catch (err) {
    console.error('Failed sining up', err)
    context.response.status = 500
  }
}
  
export const handleLogIn = async (context) => {
  try {
    const { username, password } = await context.request.body().value
    const { correct, user_id } = await login(username, password)
    if (!correct) {
      context.response.status = 401
      return
    }
    const jwtPayload = {userId: user_id, username: username}
    const jwt = await createJwt(config.jwtHead, jwtPayload, config.jwtSecret)
    context.response.headers.set('Authorization', `Bearer ${jwt}`)
    context.response.status = 200
  } catch (err) {
    console.error('login eror', err)
    context.response.status = 500
  }
}
