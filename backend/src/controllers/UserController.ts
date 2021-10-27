import express, { Request, Response, NextFunction } from 'express'
import { ProjectCreateInput } from '../dto/Project'
import { Project } from '../models'
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
            return res.json(signature)
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


// export const UpdateUserProfile = async (req: Request, res: Response, next: NextFunction) => {

//     const user = req.user

//     const { name, address, phone } = <EditVandorInput>req.body

//     if (user) {
//         const existingVandor = await findVandor(user._id)
//         if (existingVandor !== null) {
//             existingVandor.name = name
//             existingVandor.address = address
//             existingVandor.phone = phone
//             const savedVandor = await existingVandor.save()
//             return res.json(savedVandor)
//         }
//         return res.json(existingVandor)
//     }

//     return res.json({ message: "User not found" })
// }


export const AddProject = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if (user) {
        const { name, description, type, color } = <ProjectCreateInput>req.body
        const master = await findUser(user._id)
        if (master !== null) {
            const createdProject = await Project.create({
                userId: user._id,
                name: name,
                description,
                type,
                color
            })

            master.projects = [...master.projects, createdProject]
            const result = await master.save()
            return res.json(result)
        }
    }

    return res.json({ message: "Something went wrong with adding project" })
}


export const GetProjects = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (user) {
        const projects = await Project.find({ userId: user._id })
        console.log("Projects", projects)
        if (projects !== null) {
            return res.json(projects)
        }
        return res.json({ message: "No projects available" })
    }

    return res.json({ message: "Something went wrong with adding project" })
}

export const DeleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const user = req.user

    if (user) {
        let projects = await Project.find({ userId: user._id })
        if (projects !== null) {
            const deletedProject = await Project.remove({ id: id })

            return res.json({ message: `Project was succesfuly deleted` })
        }
        return res.json({ message: "No projects available" })
    }

    return res.json({ message: "Something went wrong with adding project" })
}

