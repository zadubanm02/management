import { ProjectService } from "../services/projectService"
import { TaskService } from "../services/taskService"

const taskService = new TaskService()
const projectService = new ProjectService()

export const taskQueries = {
    Tasks: (parent, args, context) => {
        return taskService.getTaskMany()
    },
    Task: (_, args) => {
        return taskService.getTaskOne(args.id)
    },

}