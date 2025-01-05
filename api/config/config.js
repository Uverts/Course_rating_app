const key = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  ['sign', 'verify'],
)
export const config = {jwtSecret: key, jwtHead: { alg: 'HS512', typ: 'JWT' }}
