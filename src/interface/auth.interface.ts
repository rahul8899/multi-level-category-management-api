export interface TokenPayload {
  user_id: string
  email: string
}

export interface DecodedToken {
  user_id: string
  email: string
  iat: number
  exp: number
}
