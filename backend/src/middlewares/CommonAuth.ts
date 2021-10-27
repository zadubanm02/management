import express, { Request, Response, NextFunction } from 'express'
import { AuthPayload } from '../dto/Auth'
import { ValidateSignature } from '../utils/PasswordUtility'

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const validate = await ValidateSignature(req)

    if (validate) {
        next()
    } else {
        return res.json({ message: "Not Authorized" })
    }

}