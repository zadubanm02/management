import { CommentCreateInput } from "../dto/Comment";
import { TaskCreateInput } from "../generated/graphql";
import { Project, Task, Comment } from "../models";

export class CommentService {
    public async addComment(input: CommentCreateInput) {
        const { userId, content, taskId } = input
        const task = await Task.findById(taskId)
        const comment = {
            userId,
            taskId,
            content,
        }
        const createdComment = await Comment.create(comment)
        if (!task) throw new Error("Task not found")
        task.comments = [...task.comments, createdComment]

        await task.save()
        if (!createdComment) throw new Error("Task couldnt be created ! Check your input")
        return createdComment
    }

    public async getCommentOne(id: string) {
        const found = await Comment.findById(id).populate('task')
        if (!found) throw new Error(`Comment with id ${id} couldnt be found`)
        return found
    }

    public async getCommentsMany() {
        const found = await Comment.find().populate('task')
        if (!found) throw new Error("No comments found!")
        return found
    }
}