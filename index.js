const express = require('express');
require('./db/config')
const app = express();
const cors = require('cors');
jwt = require('jsonwebtoken');
jwtKey = 'vcr@134'
const bodyParser = require('body-parser')
app.use(`/uploads`, express.static('./uploads'))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 350
// app.use(`/uploads`, express.static('./uploads'))
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers",
        "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

const {
    EmployePostRouter,
    EmployeGetRouter,
    EmployeDeleteRouter,
    EmployeGetRouterbyID,
    EmployePutRouterbyId,
    EmploginPostRouter
} = require('./Routes/PharmaList')
app.use('/PharmaList', EmployePostRouter)
app.use(`/EmployeeList_Get`, EmployeGetRouter)
app.use(`/EmployeeList_Delete`, EmployeDeleteRouter)
app.use(`/EmployeeListById`, EmployeGetRouterbyID)
app.use(`/EmployeeList_Updatedy_Id`, EmployePutRouterbyId)
app.use('/EmpLogin', EmploginPostRouter)




const {
    eventPostRouter,
    eventGetRouter,
    eventGetRouterbyID,
    eventPutRouterbyId,
    eventDeleteRouter
} = require('./Routes/Events')
app.use('/addEvents', eventPostRouter)
app.use('/eventsDetails', eventGetRouter)
app.use('/eventsUpdate', eventGetRouterbyID)
app.use('/eventsUpdate', eventPutRouterbyId)
app.use('/eventsDelete', eventDeleteRouter)


// const {
//     LeavePostRouter,
//     LeaveGetRouter,
//     LeaveGetRouterById,
//     LeavePutRouter, LeaveDeleteRouter,
//     GetLeaveIdRouter
// } = require('./Routes/Leaves')

// app.use('/leave', LeavePostRouter)
// app.use('/leave', LeaveGetRouter)
// app.use('/leave', LeaveGetRouterById)
// app.use('/leave', LeavePutRouter)
// app.use('/leave', GetLeaveIdRouter)
// app.use('/leaveDelete', LeaveDeleteRouter)

const {
    AdminsPostRouter,
    AdminsGetRouter,
    AdminloginRouter,
    PutPermissionRouter,
    AdminPermGetRouterById,
    APIRout
} = require('./Routes/Admins')
app.use('/AdminSignUp', AdminsPostRouter)
app.use('/AdminDetail', AdminsGetRouter)
app.use('/AdminLogin', AdminloginRouter)
app.use('/AdminPermisions', PutPermissionRouter)
app.use('/AdminPermisionsId', AdminPermGetRouterById)
app.use('/APImine', APIRout)

const {
    UserPostRouter,
    loginPostRouter,
    UserGetRouterById,
} = require('./Routes/Login')
app.use('/user', UserPostRouter)
app.use('/userLogin', loginPostRouter)
app.use('/userGetId', UserGetRouterById)

const {
    ConsultantPostRouter,
    ConsultantPutRouterbyId,
    ConsultantGetRouterbyID,
    ConsGetRouter,
    ConsultantDeleteRouter
} = require('./Routes/ConsultantDetail')
app.use('/addConsultant', ConsultantPostRouter)
app.use('/ConAllget', ConsGetRouter)
app.use('/FetchConsultantId', ConsultantGetRouterbyID)
app.use('/UpdateConsultant', ConsultantPutRouterbyId)
app.use('/DeleteConsultant', ConsultantDeleteRouter)

app.get('/', (req, res)=>{
    app.use(express.static(path.join(__dirname, '/client/build')))   
res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(process.env.PORT ||350, ()=>{
 console.log("connected")
});
app.listen(PORT)