import { Type } from "typescript";
import { ProjectType } from "./ProjectType";

export interface ProjectCreateInput {
    name: string;
    description: string;
    type: ProjectType;
    color?: string;
}