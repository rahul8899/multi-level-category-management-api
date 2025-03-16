import { Router } from 'express'
import { bodyValidator } from '../../middleware/validate.middleware'
import { AuthController } from './auth.controller'
import { userSchema } from './auth.schema'
import { Auth } from '../../middleware/auth.middleware'

export class AuthRoute {
    router = Router()
    private ac: AuthController = new AuthController()

    constructor() {
        this.router.post('/register', [bodyValidator(userSchema)], this.ac.registerUser)

        this.router.post('/login', this.ac.loginUser)
    }
}
