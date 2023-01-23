
import express from "express"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js"
import recordsRouter from "./routes/RecordsRoutes.js"



const server = express()
server.use(express.json())
server.use(cors())

server.use([authRouter, recordsRouter])

server.listen(5000, () => {
  console.log('Servidor deu bom!!!')
})