import { CommentService } from "../services/commentService"

const commentService = new CommentService()

export const commentMutations = {
    addComment: (_, args) => {
        const input = { ...args.input }
        return commentService.addComment(input)
    }
}