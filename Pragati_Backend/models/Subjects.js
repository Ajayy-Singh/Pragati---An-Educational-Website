import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    subject: {type: String},
    ref: "Semester",
    resourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResourseType"
    }]
})

export default mongoose.Schema("Subject",subjectSchema);