import mongoose from 'mongoose';

const schema = mongoose.Schema;

const StudentSchema = new mongoose.Schema({
    first_name: schema.Types.String,
    last_name: schema.Types.String,
    birthdate: schema.Types.Date,
    email: { 
        type: schema.Types.String, 
        required: true,
        index:{
            unique: true,
            sparse: true
        }
    },
    address: { type: schema.Types.String, default: '' },
    gender: { type: schema.Types.String, default: '0' }
});


export const Student = mongoose.model('Student', StudentSchema);