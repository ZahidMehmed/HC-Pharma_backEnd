const mongoose =  require('mongoose');
mongoose.connect(`mongodb+srv://chzahidm431:7t6zdtzMX2CSQYN9@cluster0.fgehbfn.mongodb.net/`);
// mongoose.connect('mongodb://0.0.0.0:27017/HC-Pharma');
const dotenv =  require('dotenv');
dotenv.config();
mongoose.set('strictQuery', false);
//