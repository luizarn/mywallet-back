
import express from "express"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js"
import recordsRouter from "./routes/RecordsRoutes.js"



const server = express()
server.use(express.json())
server.use(cors())

server.use([authRouter, recordsRouter])

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server running in port: ${port}`)
})