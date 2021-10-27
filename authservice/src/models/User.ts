import mongoose, { Document, Model, Schema } from 'mongoose'


interface UserDoc extends Document {
    name: string;
    address: string;
    phone: string;
    email: string;
    salt: string;
    password: string;
}


const UserSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
},
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.salt;
                delete ret.__v;
            }
        },
        timestamps: true
    })

const User = mongoose.model<UserDoc>('user', UserSchema)


export { User }