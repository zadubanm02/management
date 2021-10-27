import { authResolvers } from "./authResolvers";
import { commentMutations } from "./commentResolvers";
import { projectMutations } from "./projectResolvers";
import { taskMutations } from "./taskResolvers";

export const mutations = {
    Mutation: {
        ...projectMutations,
        ...taskMutations,
        ...commentMutations,
        ...authResolvers
    }
}