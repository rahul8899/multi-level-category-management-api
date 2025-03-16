import { config } from 'dotenv'
config()

export const NODE_ENV = process.env.NODE_ENV || ''
export const PORT = Number(process.env.PORT ?? 9001)
export const DB_URL = process.env.DB_URL || ''
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || ''
export const SESSION_EXPIRY = process.env.SESSION_EXPIRY || 15
