import { sql } from '../database/database.js'
import { scrypt } from '../deps.js'

export const createUser = async (username, password) => {
  return await sql`
  INSERT INTO users (username, pw_hash)
  VALUES (${username}, ${scrypt.hash(password)})
  RETURNING user_id`
}

export const login = async (username, password) => {
  const found = await getUser(username)
  if (found.length > 0) {
    const { pw_hash, user_id } = found[0]
    const correct = scrypt.verify(password, pw_hash) 
    return { correct, user_id }
  }   
  return { correct: false }
}

export const getUser = async (username) => {
    return  await sql`SELECT * FROM users WHERE username = ${username}`
  }
  