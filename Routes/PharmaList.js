const express = require('express');
const app = express();
const cors = require('cors');
require('../db/config')
app.use(`/Uploads`, express.static('../Uploads'))
const taDetails = require('../ScheemaModels/PharmaScheema')
const multer = require('multer')
const path = require('path');
const fs = require('fs');
app.use(express.json())
app.use(cors())
//midleWare
const {upload} = require('./middleware')
// const storage = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, callBack) {
//             callBack(null, "./Uploads")
//         },
//         filename: function (req, file, callBack) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//             const ext = path.extname(file.originalname);
//             callBack(null, file.fieldname + '-' + uniqueSuffix + ext)
//         }
//     })
// }).single('image')

const EmployePostRouter = express.Router()
EmployePostRouter.post('/', upload.single('TabPhoto'), async (req, resp) => {
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

const EmployeGetRouter = express.Router()
EmployeGetRouter.get('/', async (req, resp) => {
    let result = await taDetails.find()
    if (result.length > 0) {
        resp.send(result)
    }
    else {
        resp.send({ result: "No Product Avalaibal" })
    }
})


const EmployeDeleteRouter = express.Router()
 EmployeDeleteRouter.delete('/:id', async (req, resp) => {
    const employee = await taDetails.findById(req.params.id);
    if (!employee) {
        return resp.status(404).send('Product not found');
    }

    const result = await taDetails.deleteOne({ _id: req.params.id });
    resp.send(result);

    // Delete the image file from the folder
    if (employee.TabPhoto) {
        const imagePath = path.join(__dirname, '../uploads', employee.TabPhoto);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

});

const EmployeGetRouterbyID = express.Router()
EmployeGetRouterbyID.get('/:id', async(req, res)=>{
    try {
        
        let result = await taDetails.findOne({_id: req.params.id });
        if (result) {
            res.send(result)
        }
        else {
            res.send("No result found")
        }
    } catch (error) {
          
    }
})




const EmployePutRouterbyId = express.Router()
EmployePutRouterbyId.put('/:id',  upload.single('TabPhoto'),async (req, res) => {
    const { 
        brandName,
        Strength,
        Ingredients,
        Description,
        DosageForm,
        Discount,
        Price  
    } = req.body;
    let TabPhoto = req.file?.filename

    try {
        let employee = await taDetails.findById(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        if (TabPhoto) {
            // Delete the previous image file if it exists
            if (employee.TabPhoto) {
                const imagePath = path.join(__dirname, '../uploads', employee.TabPhoto);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        } else {
            // If no new image file was uploaded, use the existing image file
            TabPhoto = employee.TabPhoto;
        }

        const result = await taDetails.findByIdAndUpdate(req.params.id, {
          TabPhoto, 
          brandName,
          Strength,
          Ingredients,
          Description,
          DosageForm,
          Discount,
          Price  
        }, { new: true });

        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating employee");
    }
});

const EmploginPostRouter = express.Router()
EmploginPostRouter.post('/', async (req, resp) => {

     if (req.body.password && req.body.email) {

        const user = await taDetails.findOne(req.body).select('-password')
        if (user) {
           
            resp.send(user)
        }
        else {
            resp.send("no Result found")
        }
    }
    else {
        resp.status(401).send({ message: 'Invalid email or password' });
    }
})

module.exports = {
    EmployePostRouter,
    EmployeGetRouter,
    EmployeDeleteRouter,
    EmployeGetRouterbyID,
    EmployePutRouterbyId,
    EmploginPostRouter
}