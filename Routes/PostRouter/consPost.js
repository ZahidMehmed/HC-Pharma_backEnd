const express = require('express');
const app  = express()
const ConPostrouter = express.Router();
const cors = require('cors');

const ConsDetails = require('../../ScheemaModels/ConsultantScheema');
ConPostrouter.use(cors());
ConPostrouter.post('/', async (req, res) => {
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
      Fee,
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
    });

    result = await result.save();
    res.send(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = ConPostrouter;
