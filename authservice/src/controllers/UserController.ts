import express, { Request, Response, NextFunction } from 'express'
import { GenerateSignature, ValidatePassword } from '../utils/PasswordUtility'
import { findUser } from './AdminController'

export const UserLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const existingVandor = await findUser('', email)

    if (existingVandor !== null) {

        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt)

        if (validation) {
            const signature = GenerateSignature({
                _id: existingVandor.id,
                name: existingVandor.name,
                email: existingVandor.email
            })
            return res.json({ jwt: signature, user: { name: existingVandor.name, email: existingVandor.email } })
        } else {
            return res.json({ message: "Password is not correct" })
        }
    }


    return res.json({ message: "Something went wrong" })

}


export const GetUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (user) {
        const existingVandor = await findUser(user._id)
        return res.json(existingVandor)
    }

    return res.json({ message: "User not found" })
}







