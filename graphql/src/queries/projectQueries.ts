import { ProjectService } from "../services/projectService"

const projectService = new ProjectService()

export const projectQueries = {
    Projects: async () => {
        return projectService.getProjectMany()
    },
    Project: async (_, args) => {
        return projectService.getProjectOne(args.id)
    }
}