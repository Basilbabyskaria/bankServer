// // server connection

// // 1.import express 
//   const { application } = require('express')
const express=require('express');

const dataservices=require('./services/data.services')//import dataservice
// const res = require('express/lib/response');
// //   2.creating an applicationfor express
const app=express()
const jwt=require('jsonwebtoken')

//to parse json from req body
app.use(express.json())//type conversion


 
// // 3.create port number (for back encode)

app.listen(3000,()=>{
    console.log('listening to port 3000');
})


// // application specific middle ware
// const appMiddleware =(req,res,next)=>{
//     console.log('application specific middle ware');
//     // next();
// }
// app.use(appMiddleware)


//router specific middleware
const jwtMiddleware =(req,res,next)=>{
    console.log('router specific middleware');
    // const token = req.body.token;
    const token = req.headers['x-access-token'];

    const data=jwt.verify(token,'superkey');
    console.log(data);
    next();

}



// app.get('/',(req,res)=>{
//     res.send('get request');
// })
// app.post('/',(req,res)=>{                             //delete,patch,
//     res.send('post request');
// })
// app.put('/',(req,res)=>{
//     res.send('put request');
// })
// app.delete('/',(req,res)=>{
//     res.send('delete request');
// })



//TODO

// 1.API CALL 
// 2.REGISTRATION Request
// 3.LOGIN Request
// 4.DEPOSIT Request


//2
//** 
// app.post('/register',(req,res)=>{
//     console.log(req.body);
//    const result = dataservices.register(req.body.acno,req.body.uname,req.body.pswd)
// //    if(result) {
// //    res.send('register success')
// //    }else{
// //     res.send('user allreadt registered')
// //    }
// res.status(result.statusCode).json(result)
    
// })
//mongo db

app.post('/register',(req,res)=>{
    console.log(req.body);
   dataservices.register(req.body.acno,req.body.uname,req.body.pswd)
   .then(result=>{
    res.status(result.statusCode).json(result)
   })
    
})


//3
app.post('/login',(req,res)=>{
    console.log(req.body);
   const result = dataservices.login(req.body.acno,req.body.pswd)
    // res.send('login success')
   .then(result=>{
    res.status(result.statusCode).json(result)

   })
    
})

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   const result = dataservices.deposit(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)
    // res.send('login success')
    
})

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   const result = dataservices.withdraw(req.body.acno,req.body.pswd,req.body.amount1)
    res.status(result.statusCode).json(result)
    // res.send('login success')
    
})
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
   const result = dataservices.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
    // res.send('login success')
    
})


// // application specific middle ware
// const appMiddleware =(req,res,next)=>{
//     console.log('application specific middle ware');
//     // next();
// }
// app.use(appMiddleware)