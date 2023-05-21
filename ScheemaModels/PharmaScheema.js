const mongoose = require('mongoose')
const pharmaSchema = new mongoose.Schema({
    TabPhoto: String,
    brandName: String,
    email: {
        type: String,
        lowercase: true
    },
    Strength: String,
    Ingredients: String,
    Description: String,
    DosageForm: String,
    Discount: String,
    Price: String,
})

module.exports = mongoose.model('PharmaStore', pharmaSchema)