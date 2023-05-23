const express = require('express');
const router = express.Router();
const cors = require('cors');
const ConsDetails = require('../../ScheemaModels/ConsultantScheema');
const { upload } = require('../../Routes/middleware');

router.post('/', cors(), upload.single('ConPhoto'), async (req, res) => {
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

module.exports = router;
