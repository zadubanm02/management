import express, { Request, Response, NextFunction } from 'express'


export const GetAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (user) {


    }

    return res.json({ message: "User not found" })
}