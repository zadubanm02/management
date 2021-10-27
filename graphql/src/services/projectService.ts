import { ProjectCreateInput } from "../generated/graphql";
import { Project } from "../models";

export class ProjectService {
    public async createProject(input: ProjectCreateInput) {
        const { name, projectType, description, color, userId } = input
        const project = {
            userId,
            name,
            type: projectType,
            description,
            color,
        };
        const created = await Project.create(project)
        return created
    }

    public async getProjectMany() {
        const found = await Project.find().populate('tasks')
        if (!found) throw new Error("Not in the database")
        return found
    }

    public async getProjectOne(id: string) {
        const found = await Project.findById(id).populate('tasks')
        if (!found) throw new Error("Not in the database")
        return found
    }
}