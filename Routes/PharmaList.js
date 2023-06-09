const express = require('express');
const app = express();
require('../db/config')
app.use(`/Uploads`, express.static('../Uploads'))
const phaDetails = require('../ScheemaModels/PharmaScheema')
const path = require('path');
const fs = require('fs');
const { upload } = require('./middleware')
const EmployePostRouter = express.Router()
EmployePostRouter.post('/', upload.single('image'), async (req, resp) => {
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

        let result = new phaDetails({
            TabPhoto,
            brandName,
            Strength,
            Ingredients,
            Description,
            DosageForm,
            Discount,
            Price
        });
        result = await result.save();
        resp.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
})

const EmployeGetRouter = express.Router()
EmployeGetRouter.get('/', async (req, resp) => {
    let result = await phaDetails.find()
    if (result.length > 0) {
        resp.send(result)
    }
    else {
        resp.send({ result: "No Product Avalaibal" })
    }
})


const EmployeDeleteRouter = express.Router()
EmployeDeleteRouter.delete('/:id', async (req, resp) => {
    const employee = await phaDetails.findById(req.params.id);
    if (!employee) {
        return resp.status(404).send('Product not found');
    }

    const result = await phaDetails.deleteOne({ _id: req.params.id });
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
EmployeGetRouterbyID.get('/:id', async (req, res) => {
    try {

        let result = await phaDetails.findOne({ _id: req.params.id });
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
EmployePutRouterbyId.put('/:id', upload.single('TabPhoto'), async (req, res) => {
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
        let employee = await phaDetails.findById(req.params.id);
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

        const result = await phaDetails.findByIdAndUpdate(req.params.id, {
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

        const user = await phaDetails.findOne(req.body).select('-password')
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