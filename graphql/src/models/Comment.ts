import mongoose, { Document, Model, Schema } from 'mongoose'


export interface CommentDoc extends Document {
    userId: string;
    taskId: string;
    content: string;
    task: any
}


const CommentSchema = new Schema({
    userId: { type: String, required: true },
    taskId: { type: String, required: true },
    content: { type: String, required: true },
    task: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'task'
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            }
        },
        timestamps: true
    })

const Comment = mongoose.model<CommentDoc>('comment', CommentSchema)


export { Comment }