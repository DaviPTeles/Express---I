import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

const usuarios = []

app.get("/usuarios/:id", async(req, res) => {
    const userExists = await prisma.usuarios.findFirst({
        where: {
            id: req.body.id
        }
    })
    
    if(userExists==null){
        res.status(400).json({
            message: "Usuário não Existe"
        })
        return
    }
    const usuarios = await prisma.usuarios.findUnique(
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.status(200).json(usuarios)
})

app.post("/usuarios", async(req, res) => {
    const EmailExists = await prisma.usuarios.findFirst({
        where: {
            email: req.body.email
        }
    })
    
    if(EmailExists){
        res.status(400).json({
            message: "Email já Existe"
        })
        return
    }

    usuarios.push(req.body)
    await prisma.usuarios.create({
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        }
    })
    res.status(201).json({
        message: "Usuário criado com sucesso"
    })
})

app.put(`/usuarios/:id`, async(req, res)=> {
    const userExists = await prisma.usuarios.findFirst({
        where: {
            id: req.body.id
        }
    })
    
    if(userExists==null){
        res.status(400).json({
            message: "Usuário não Existe"
        })
        return
    }

    const EmailExists = await prisma.usuarios.findFirst({
        where: {
            email: req.body.email
        }
    })
    
    if(EmailExists){
        res.status(400).json({
            message: "Email já Existe"
        })
        return
    }

    await prisma.usuarios.update(
        {   
            where: {
                id: req.params.id
            },
            data:{
                name: req.body.name,
                age : req.body.age,
                email: req.body.email
            }
        }
    )
    res.status(200).json({
        message: "Usuário atualizado com sucesso"
    })
    res.send(message)
})

app.delete(`/usuarios/:id`, async(req, res)=> {
    await prisma.usuarios.delete(
        {   
            where: {
                id: req.params.id
            }
        }
    )
    res.status(200).json({
        message: "Usuário deletado com sucesso"
    })
    res.send(message)
})

app.listen(3000, () => {
    console.log("O servidor está rodando na porta 3000")
})