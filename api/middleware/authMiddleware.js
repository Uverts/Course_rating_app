import { verify as verifyJwt } from '../deps.js'
import { config } from '../config/config.js'

export const authMiddleware = async (context, next) => {
  try {
    const auth = context.request.headers.get('Authorization')
    if (auth && auth !== "null") { //temp
      const jwt = auth.split(' ')[1]
      const { userId, username } = await verifyJwt(jwt, config.jwtSecret)
      context.userId = userId
      context.username = username
    } else {
      console.log('No auth header')
    }
  } catch (err){
    console.error('Failed while parsing and verifying jwt',err)
  }
  await next()
}
