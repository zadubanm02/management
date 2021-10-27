import express, { Request, Response, NextFunction } from 'express'
import { CreateUserInput } from '../dto/User'
import { User } from '../models'
import { GeneratePassword, GenerateSalt } from '../utils/PasswordUtility'

export const findUser = async (id: string | undefined, email?: string) => {
    if (email) {
        const user = await User.findOne({ email: email })
        return user
    } else {
        const user = await User.findById(id)
        return user
    }
}


export const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, phone, email, password } = <CreateUserInput>req.body

    const existingVandor = await findUser('', email)

    if (existingVandor !== null) return res.json({ message: "User with this email has been already created" })

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt);

    const createdUser = await User.create({
        name: name,
        address: address,
        phone: phone,
        salt: salt,
        email: email,
        password: userPassword,
        projects: []
    })

    return res.json(createdUser)
}

export const GetUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find()

    if (users === null) {
        return res.json({ message: "No vandors in database" })
    }

    return res.json(users)

}

export const GetUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    const user = await findUser(id)

    if (user === null) {
        return res.json({ message: "User not found" })
    }

    return res.json(user)
}