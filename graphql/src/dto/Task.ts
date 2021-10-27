export interface TaskCreateInput {
    projectId: string;
    title: string;
    description?: string;
    duration?: Date
}