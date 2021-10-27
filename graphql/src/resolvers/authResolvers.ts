import { AuthService } from "../services/authService"

const authService = new AuthService()

export const authResolvers = {
    register: async (parent, args, context, info) => {
        const input = { ...args.input }
        const result = await authService.register(input)
        if (result.message) return { ...result, error: result.message }
        return result
    },
    login: async (parent, args, context, info) => {
        const input = { ...args.input }
        const result = await authService.login(input)
        if (result.message) return { ...result, error: result.message }
        return result
    }
}