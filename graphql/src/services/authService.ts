import axios from 'axios'
import { LoginInput, RegisterInput } from '../generated/graphql'

export class AuthService {
    public async register(input: RegisterInput) {
        const { name, email, phone, address, password } = input

        const { data } = await axios.post('http://localhost:8000/user/register', {
            name,
            email,
            phone,
            address,
            password
        })

        console.log("Data", data)
        return data
    }

    public async login(input: LoginInput) {
        const { email, password } = input
        const { data } = await axios.post('http://localhost:8000/user/login', {
            email,
            password
        })
        return data
    }

}