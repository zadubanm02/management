import { ProjectService } from "../services/projectService";
import { TaskService } from "../services/taskService";
import { commentQueries } from "./commentQueries";
import { projectQueries } from "./projectQueries";
import { taskQueries } from "./taskQueries";

const taskService = new TaskService()
const projectService = new ProjectService()


export const queries = {
    Query: {
        ...projectQueries,
        ...taskQueries,
        ...commentQueries
    },
    Task: {
        project: (parent, args, context) => {
            return projectService.getProjectOne(parent.projectId)
        }
    },
    Comment: {
        task: (parent) => {
            return taskService.getTaskOne(parent.taskId)
        }
    }
}