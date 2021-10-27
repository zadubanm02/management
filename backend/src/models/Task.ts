import mongoose, { Document, Model, Schema } from 'mongoose'


interface TaskDoc extends Document {
    projectId: string;
    title: string;
    description?: string;
    duration?: Date
}


const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Date },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'project'
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

const Task = mongoose.model<TaskDoc>('task', TaskSchema)


export { Task }