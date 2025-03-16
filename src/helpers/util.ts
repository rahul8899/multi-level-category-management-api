import { encode } from './jwt'
import { TokenPayload } from '../interface/auth.interface'


export const loginToken = (payload: TokenPayload): string => {
  const date = new Date()
  const token = encode({
    user_id: payload.user_id,
    email: payload.email,
    iat: Math.floor(date.getTime() / 1000),
    exp: Math.floor(date.setDate(date.getDate() + 15) / 1000),
  })
  return token
}