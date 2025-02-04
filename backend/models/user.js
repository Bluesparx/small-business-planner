import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    aiAgent: {
        type: {
            context: { type: String, default: '' },
            initialized: { type: Boolean, default: false }
        },
        default: {}
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;