import { queries } from "./queries";
import { mutations } from "./resolvers";

export const resolvers = {
    ...queries,
    ...mutations
}