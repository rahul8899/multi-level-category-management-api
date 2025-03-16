import { NextFunction, Response, Request } from 'express'
import { InvalidTokenResponse, UnauthorizedResponse } from '../helpers/http'
import { decode } from '../helpers/jwt'
import { DecodedToken } from '../interface/auth.interface'

export const Auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.headers.authorization?.replace(/^bearer/i, '').trim()

    if (!token) return InvalidTokenResponse(res)
    const decoded_token: DecodedToken = decode(token)

    if (!decoded_token.user_id) return InvalidTokenResponse(res)

    res.locals.user = decoded_token

    return next()

  } catch (err: any) {
    return UnauthorizedResponse(res, err.message)
  }
}
