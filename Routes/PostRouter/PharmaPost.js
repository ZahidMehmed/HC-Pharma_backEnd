const express = require('express');
require('../../db/config')
const app = express()
app.use(`/Uploads`, express.static('../../Uploads'))
const taDetails = require('../../ScheemaModels/PharmaScheema')
const path = require('path');
const fs = require('fs');
//midleWare
const {upload} = require('../middleware')
const cors = require('cors');
const medicines = express.Router();
medicines.use(cors());
medicines.post('/', upload.single('TabPhoto'), async (req, resp) => {
    try {
    const {
          brandName,
          Strength,
          Ingredients,
          Description,
          DosageForm,
          Discount,
          Price         
        } = req.body
    let TabPhoto = req.file?.filename

    let result = new taDetails({ 
        TabPhoto,
        brandName,
        Strength,
        Ingredients,
        Description,
        DosageForm,
        Discount,
        Price});
    result = await result.save();
    resp.send(result)
    console.log(result)
} catch (error) {
        console.log(error)
}
})
module.exports = medicines