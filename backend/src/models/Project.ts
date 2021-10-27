import mongoose, { Document, Model, Schema } from 'mongoose'
import { ProjectType } from '../dto/ProjectType';


interface ProjectDoc extends Document {
    userId: string;
    name: string;
    description: string;
    type: ProjectType;
    color?: string;
}


const ProjectSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },
    tasks: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'task'
    }],
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
            }
        },
        timestamps: true
    })

const Project = mongoose.model<ProjectDoc>('project', ProjectSchema)


export { Project }