const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/config');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 350;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Headers","Origin, X-Rquested-With, Content-Type, Accept");
  next();
});

// Routes
const {
  EmployePostRouter,
  EmployeGetRouter,
  EmployeDeleteRouter,
  EmployeGetRouterbyID,
  EmployePutRouterbyId,
  EmploginPostRouter
} = require('./Routes/PharmaList');

app.use('/PharmaList', EmployePostRouter);
app.use('/EmployeeList_Get', EmployeGetRouter);
app.use('/EmployeeList_Delete', EmployeDeleteRouter);
app.use('/EmployeeListById', EmployeGetRouterbyID);
app.use('/EmployeeList_Updatedy_Id', EmployePutRouterbyId);
app.use('/EmpLogin', EmploginPostRouter);

const {
  eventPostRouter,
  eventGetRouter,
  eventGetRouterbyID,
  eventPutRouterbyId,
  eventDeleteRouter
} = require('./Routes/Events');

app.use('/addEvents', eventPostRouter);
app.use('/eventsDetails', eventGetRouter);
app.use('/eventsUpdate', eventGetRouterbyID);
app.use('/eventsUpdate', eventPutRouterbyId);
app.use('/eventsDelete', eventDeleteRouter);

const {
  AdminsPostRouter,
  AdminsGetRouter,
  AdminloginRouter,
  PutPermissionRouter,
  AdminPermGetRouterById,
  APIRout
} = require('./Routes/Admins');

app.use('/AdminSignUp', AdminsPostRouter);
app.use('/AdminDetail', AdminsGetRouter);
app.use('/AdminLogin', AdminloginRouter);
app.use('/AdminPermisions', PutPermissionRouter);
app.use('/AdminPermisionsId', AdminPermGetRouterById);
app.use('/APImine', APIRout);

const {
  UserPostRouter,
  loginPostRouter,
  UserGetRouterById,
} = require('./Routes/Login');

app.use('/user', UserPostRouter);
app.use('/userLogin', loginPostRouter);
app.use('/userGetId', UserGetRouterById);

const {
  ConsultantPostRouter,
  ConsultantPutRouterbyId,
  ConsultantGetRouterbyID,
  ConsGetRouter,
  ConsultantDeleteRouter
} = require('./Routes/ConsultantDetail');

app.use('/addConsultant', ConsultantPostRouter);
app.use('/ConAllget', ConsGetRouter);
app.use('/FetchConsultantId', ConsultantGetRouterbyID);
app.use('/UpdateConsultant', ConsultantPutRouterbyId);
app.use('/DeleteConsultant', ConsultantDeleteRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Main Page');
});

app.listen(PORT, () => {
  console.log('connected');
});
