//import token
 const jwt =require('jsonwebtoken');
//import db
 const db=require('./db')

accDetails={
    1000:{acno:1000,pswd:1000,uname:'enjoyal',transaction:[],balance:100},
    1001:{acno:1001,pswd:1001,uname:'akhil',transaction:[]  ,balance:100},
    1002:{acno:1002,pswd:1003,uname:'enjoyal',transaction:[],balance:100},
}
// register=(acno,uname,pswd)=>{
//   if(acno in accDetails){
//     // return false;
//     return{
//       "status":false,
//       statusCode:400,
//       message:'user already registered'
//     }
//   }
//   else{
//     accDetails[acno]={                                    //same in bankapp dataservices
//       acno:acno,
//       uname:uname,
//       pswd:pswd,
//       balance:0,
//       transaction:[]
//     }
//     // return true;
//     return{
//       status:true,
//       statusCode:200,
//       message:'register success'
//     }
//   }
// }

//mongodb

const register=(acno,uname,pswd)=>{
  return db.User.findOne({acno,uname,pswd})//data
  .then(user=>{
    if(user){
      return{
        "status":false,
        statusCode:400,
        message:'user already registered'
      }
    }else{
      const newUser=new db.User({
        acno:acno,
        username:uname,
        password:pswd,
        balance:0,
        transaction:[]
      })
      newUser.save()//save data to mongodb
  
     return{
      status:true,
      statusCode:200,
      message:'register success'
     }
    }
  })
}



const login=(acno,pswd)=>{
  return db.User.findOne({acno,password:pswd})//data
    .then(user=>{
      if(user){
        currentUser=user.username;
        console.log(`db${currentUser}`);
        currentAcno=acno
      const token =jwt.sign({currentAcno:acno},'superkey')
      return{
        "status":true,
        statusCode:200,
        message:'Login Success',
        token:token,
        currentUser:user.username,
        currentAcno:acno,
      }
      }else{
        return{
          "status":false,
          statusCode:400,
          message:'Invalid User'
        }
      }
    })
  //   if(pswd==accDetails[acno].pswd){
  //     currentUser=accDetails[acno].uname;
  //     currentAcno=acno

  //     //to generate token
  //     const token =jwt.sign({currentAcno:acno},'superkey')


  //     // return true;
  //     return{
  //       "status":true,
  //       statusCode:200,
  //       message:'Login Success',
  //       token:token
  //     }
  //   }
  //   else{
  //     // return false;
  //     return{
  //       "status":false,
  //       statusCode:400,
  //       message:'Incorrect Password'
  //     }
  //   }
  // }
  // else{
  //   // return false;
  //   return{
  //     "status":false,
  //     statusCode:400,
  //     message:'Invalid User'
  //   }
    
  // }
}
const deposit=(acno, pswd,amount)=>{
  amount=parseInt(amount);
  return db.User.findOne({acno,pswd})//data
  .then(user=>{
    if(user){
       user.balance+=amount;
       user.transaction.push({
        Type:'credit',Amount:amount
       })
        user.save();
        return {
          status:true,
          statusCode:200,
          message:`${amount}is credited and balance :${user.balance}`
        }
    }
    else{
      return{
        
        "status":false,
        statusCode:400,
        message:'Invalid User'
      }
    }
  })
}
const withdraw=(acno,pswd,amount1)=>{
  amount1=parseInt(amount1);
  return db.User.findOne({acno,pswd})//dat
  .then(user=>{
    if(user){
    
        user.balance-=amount1;
        //parsing element to transaction array
        user.transaction.push({
          Type:'Debit',Amount:amount1
        })
        user.save();
        return {
          status:true,
          statusCode:200,
          message:`${amount1}is debited and balance :${user.balance}`
        }
    }else{
      return{
        "status":false,
        statusCode:400,
        message:'Insufficient balance'
      }
    }
  })
  
}

getTransaction=(acno)=>{
  return{
    status:true,
    statusCode:200,
    transaction:accDetails[acno].transaction
  }
}
module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}