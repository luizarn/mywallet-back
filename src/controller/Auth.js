
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'



export async function signUp(req, res) {
    const { name, email, password } = req.body

    const passwordHashed = bcrypt.hashSync(password, 10)

    try {
        const checkUser = await db.collection("users").findOne({ email })

        if (checkUser) return res.status(409).send("user already cadastred")

        await db.collection("users").insertOne({ name, email, password: passwordHashed })

        res.status(201).send("user cadastred!")

    } catch {
        res.status(500).send(error.message)
    }
}


export async function signIn(req, res) {
    const { email, password } = req.body

    try {

        const checkUser = await db.collection("users").findOne({ email })

        console.log(checkUser)

        if (!checkUser) return res.status(400).send("user or password incorrect")

        const hashPassword = bcrypt.compareSync(password, checkUser.password)

        if (!hashPassword) return res.status(400).send("user or password incorrect")

        const token = uuidV4();

        const teste = await db.collection("sessions").insertOne({ idUser: checkUser._id, token, name: checkUser.name })

        console.log(teste)

        return res.status(200).send({ token, checkUser: { name: checkUser.name } })

    } catch (error) {
        res.status(500).send(error.message)
    }
}
