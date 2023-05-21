const mongoose = require('mongoose')
const ConsultantSchema = new mongoose.Schema({
    ConPhoto: String,
    ConName: String,
    email: {
        type: String,
        lowercase: true
    },
    Password: String,
    Contact: String,
    SpecialList: String,
    StartTme: String,
    EndTime: String,
    Discription: String,
    Qualifications: String,
    Fee: String,
    Mon: { type: Boolean, default: true },
    Tue:{ type: Boolean, default: true },
    Wed:{ type: Boolean, default: true },
    Thu: { type: Boolean, default: true },
    Fri: { type: Boolean, default: true },
    Sat:{ type: Boolean, default: true },
    Sun: { type: Boolean, default: true },
  

})

module.exports = mongoose.model('Consultants', ConsultantSchema)