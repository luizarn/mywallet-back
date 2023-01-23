import { recordSchema } from '../schema/RecordSchema.js'
import db from '../config/database.js'
import dayjs from "dayjs";

const date = dayjs().format("DD/MM")

export async function listExtract(req, res) {
  const { authorization } = req.headers
  const { user } = req.headers
  const token = authorization?.replace("Bearer ", '')


  if (!token) return res.status(422).send("Informe o token!")

  try {
    const checkSession = await db.collection("sessions").findOne({ token })

    if (!checkSession) return res.status(401).send("Você não tem autorização para visualizar o extrato")

    const data = await db.collection("extract").find({ user }).toArray()

    return res.send(data)

  } catch (error) {
    res.status(500).send("Deu algum problema no servidor de banco de dados")
  }
}


export async function createEntrance(req, res) {
  const { authorization } = req.headers
  const entrance = req.body
  const { user } = req.headers
  const checkSession = res.locals.session
  const token = authorization?.replace("Bearer ", '')

  try {
    const checkSession = await db.collection("sessions").findOne({ token })

    if (!checkSession) return res.status(401).send("Você não tem autorização para cadastrar uma entrada")

    await db.collection("entrances").insertOne(
      { value: entrance.value, description: entrance.description, user })

    await db.collection("extract").insertOne({ date, description: entrance.description, value: entrance.value, user, type: 'entrance' })
    res.status(201).send("ok")

  } catch (err) {
    console.log(err)
    res.status(500).send("Deu algo errado no servidor")
  }
}

export async function createExit(req, res) {
  const { authorization } = req.headers
  const exit = req.body
  const token = authorization?.replace("Bearer ", '')
  const checkSession = res.locals.session
  const { user } = req.headers

  try {
    const checkSession = await db.collection("sessions").findOne({ token })

    if (!checkSession) return res.status(401).send("Você não tem autorização para cadastrar uma saída")

    await db.collection("exits").insertOne(
      { value: exit.value, description: exit.description, user })

    await db.collection("extract").insertOne({ date, description: exit.description, value: exit.value, user, type: 'exit' })

    res.status(201).send("ok")

  } catch (err) {
    console.log(err)
    res.status(500).send("Deu algo errado no servidor")
  }
}









