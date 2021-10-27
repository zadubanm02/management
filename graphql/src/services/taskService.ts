import { TaskCreateInput } from "../generated/graphql";
import { Project, Task } from "../models";

export class TaskService {
    public async addTask(input: TaskCreateInput) {
        const { projectId, title, description, duration } = input
        const project = await Project.findById(projectId)
        const task = {
            projectId,
            title,
            description,
            duration,
        }
        const createdTask = await Task.create(task)
        if (!project) throw new Error("Project not found")
        project.tasks = [...project.tasks, createdTask]

        await project.save()
        if (!createdTask) throw new Error("Task couldnt be created ! Check your input")
        return createdTask
    }

    public async getTaskOne(id: string) {
        const found = await Task.findById(id).populate('project').populate('comments')
        console.log("Task", found)
        if (!found) throw new Error(`Task with id ${id} couldnt be found`)
        return found
    }

    public async getTaskMany() {
        const found = await Task.find().populate('project').populate('comments')
        if (!found) throw new Error("No tasks found!")
        return found
    }
}