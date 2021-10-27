import { ProjectService } from "../services/projectService"

const projectService = new ProjectService()

export const projectMutations = {
    addProject: (_, args) => {
        const input = { ...args.input }
        return projectService.createProject(input)
    }
}