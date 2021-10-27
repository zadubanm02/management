import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../config'
import { AuthPayload } from '../dto/Auth'
import { Request } from 'express'

export const ValidateSignature = async (req: Request) => {
    //@ts-ignore
    const signature = req.get('Authorization')
    if (signature) {
        const payload = jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload
        //@ts-ignore
        return req.user = payload
    }
    return false
}