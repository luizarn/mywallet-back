
import { signIn, signUp } from "../controller/Auth.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { loginSchema, registrationUserSchema } from "../schema/AuthSchema.js"


const authRouter = Router()

// Rotas de autenticação
authRouter.post("/sign-up", validateSchema(registrationUserSchema), signUp)
authRouter.post("/login", validateSchema(loginSchema), signIn)

export default authRouter  