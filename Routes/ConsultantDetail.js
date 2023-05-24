const express = require('express');
const Consultapp = express();
const cors = require('cors');
require('../db/config')
Consultapp.use(`/Uploads`, express.static('../Uploads'))
const ConsDetails = require('../ScheemaModels/ConsultantScheema')
const path = require('path');
const fs = require('fs');

//midleWare
const {upload} = require('./middleware')

const ConsultantPostRouter = express.Router()
ConsultantPostRouter.post('/addConsultant', cors(), upload.single('ConPhoto'), async (req, resp) => {
    try {
      const {
        ConName,
        email,
        Password,
        Contact,
        SpecialList,
        StartTme,
        Discription,
        Qualifications,
        EndTim,
        Mon,
        Tue,
        Wed,
        Thu,
        Fri,
        Sat,
        Sun,
        Fee
      } = req.body;
  
      let ConPhoto = req.file?.filename;
      let result = new ConsDetails({
        ConPhoto,
        ConName,
        email,
        Password,
        Contact,
        SpecialList,
        StartTme,
        Discription, // Convert the array to a string
        Qualifications,
        EndTim,
        Mon,
        Tue,
        Wed,
        Thu,
        Fri,
        Sat, // Convert the string to a boolean
        Sun,
        Fee
      });
  
      result = await result.save();
      resp.send(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });
  

const ConsGetRouter = express.Router()
ConsGetRouter.get('/ConAllget', async (req, resp) => {
    let result = await ConsDetails.find()
    if (result.length > 0) {
        resp.send(result)
    }
    else {
        resp.send({ result: "No Product Avalaibal" })
    }
})


const ConsultantDeleteRouter = express.Router()
 ConsultantDeleteRouter.delete('/DeleteConsultant/:id', async (req, resp) => {
    const Consultant = await ConsDetails.findById(req.params.id);
    if (!Consultant) {
        return resp.status(404).send('Product not found');
    }

    const result = await ConsDetails.deleteOne({ _id: req.params.id });
    resp.send(result);

    // Delete the image file from the folder
    if (Consultant.ConPhoto) {
        const imagePath = path.join(__dirname, '../uploads', Consultant.ConPhoto);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

});

const ConsultantGetRouterbyID = express.Router()
ConsultantGetRouterbyID.get('/FetchConsultantId/:id', async(req, res)=>{
    try {
        
        let result = await ConsDetails.findOne({_id: req.params.id });
        if (result) {
            res.send(result)
        }
        else {
            res.send("No result found")
        }
    } catch (error) {
          
    }
})
const ConsultantPutRouterbyId = express.Router()
ConsultantPutRouterbyId.put('/UpdateConsultant/:id',  upload.single('ConPhoto'),async (req, res) => {
    const { 
        ConName,
        email,
        Password,
        Contact,
        SpecialList,
        StartTme,
        Discription,
        Qualifications,
        EndTim,
        Mon,
        Tue,
        Wed,
        Thu,
        Fri,
        Sat,
        Sun,
        Fee, 
    } = req.body;
    let ConPhoto = req.file?.filename

    try {
        let Consultant = await ConsDetails.findById(req.params.id);
        if (!Consultant) {
            return res.status(404).send('Employee not found');
        }

        if (ConPhoto) {
            // Delete the previous image file if it exists
            if (Consultant.ConPhoto) {
                const imagePath = path.join(__dirname, '../uploads', Consultant.ConPhoto);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        } else {
            // If no new image file was uploaded, use the existing image file
            ConPhoto = Consultant.ConPhoto;
        }

        const result = await ConsDetails.findByIdAndUpdate(req.params.id, {
          ConPhoto, 
          ConName,
          email,
          Password,
          Contact,
          SpecialList,
          StartTme,
          Discription,
          Qualifications,
          EndTim,
          Mon,
          Tue,
          Wed,
          Thu,
          Fri,
          Sat,
          Sun,
          Fee,  
        }, { new: true });

        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating Consultant");
    }
});

const ConsloginPostRouter = express.Router()
ConsloginPostRouter.post('/', async (req, resp) => {

     if (req.body.password && req.body.email) {

        const user = await ConsDetails.findOne(req.body).select('-password')
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

Consultapp.use(ConsultantPostRouter);
Consultapp.use(ConsGetRouter);
Consultapp.use(ConsultantDeleteRouter);
Consultapp.use(ConsultantGetRouterbyID);
Consultapp.use(ConsultantPutRouterbyId);

module.exports =Consultapp