const mongoose =  require('mongoose');
mongoose.connect('mongodb+srv://chzahidm431:H287JxjS0nWkxh1q@cluster0.qo9iei3.mongodb.net/');
const dotenv =  require('dotenv');
dotenv.config();
mongoose.set('strictQuery', false);
