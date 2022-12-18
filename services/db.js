//server -mongodb integraton

// import mongoose ;
const mongoose=require('mongoose');

//state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',
{
useNewUrlParser:true//to avoid unwanted warnings
});

//define bank db model
const User=mongoose.model('User',
{
    //Schema creation 
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export collection

module.exports={
    User 
}