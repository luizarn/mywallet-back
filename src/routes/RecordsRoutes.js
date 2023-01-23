import {
  createEntrance, createExit, listExtract
} from "../controller/Records.js"
import { Router } from 'express'
import { validateSchema } from "../middleware/validateSchema.js"
import { recordSchema } from "../schema/RecordSchema.js"
import { authValidation } from "../middleware/AuthMiddleware.js"

const recordsRouter = Router()


recordsRouter.use(authValidation)
recordsRouter.get("/home", listExtract)
recordsRouter.use(validateSchema(recordSchema))
recordsRouter.post("/new-entrance", createEntrance)
recordsRouter.post("/new-exit", createExit)

export default recordsRouter 