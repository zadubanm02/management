import mongoose, { Document, Model, Schema } from 'mongoose'


export interface TaskDoc extends Document {
    projectId: string;
    title: string;
    description?: string;
    duration?: Date;
    project: any
    comments: any
}


const TaskSchema = new Schema({
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Date },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'project'
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment'
    }]
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            }
        },
        timestamps: true
    })

const Task = mongoose.model<TaskDoc>('task', TaskSchema)


export { Task }