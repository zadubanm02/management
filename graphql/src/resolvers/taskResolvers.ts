import { TaskService } from "../services/taskService"

const taskService = new TaskService()

export const taskMutations = {
    addTask: (_, args) => {
        const input = { ...args.input }
        return taskService.addTask(input)
    }
}