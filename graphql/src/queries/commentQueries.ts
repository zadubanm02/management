import { CommentService } from "../services/commentService"
import { ProjectService } from "../services/projectService"

const commentService = new CommentService()

export const commentQueries = {
    Comments: (parent, args, context) => {
        if (context.user) {
            return commentService.getCommentsMany()
        }
        return null
    },
    Comment: (_, args) => {
        return commentService.getCommentOne(args.id)
    },

}