//import token
 const jwt =require('jsonwebtoken');

accDetails={
    1000:{acno:1000,pswd:1000,uname:'enjoyal',transaction:[],bal:100},
    1001:{acno:1001,pswd:1001,uname:'akhil',transaction:[]  ,bal:100},
    1002:{acno:1002,pswd:1003,uname:'enjoyal',transaction:[],bal:100},
}
register=(acno,uname,pswd)=>{
  if(acno in accDetails){
    // return false;
    return{
      "status":false,
      statusCode:400,
      message:'user already registered'
    }
  }
  else{
    accDetails[acno]={                                    //same in bankapp dataservices
      acno:acno,
      uname:uname,
      pswd:pswd,
      bal:0,
      transaction:[]
    }
    // return true;
    return{
      status:true,
      statusCode:200,
      message:'register success'
    }
  }
}


login=(acno,pswd)=>{
  // alert("click click click");
  if(acno in accDetails){
    if(pswd==accDetails[acno].pswd){
      currentUser=accDetails[acno].uname;
      currentAcno=acno

      //to generate token
      const token =jwt.sign({currentAcno:acno},'superkey')


      // return true;
      return{
        "status":true,
        statusCode:200,
        message:'Login Success',
        token:token
      }
    }
    else{
      // return false;
      return{
        "status":false,
        statusCode:400,
        message:'Incorrect Password'
      }
    }
  }
  else{
    // return false;
    return{
      "status":false,
      statusCode:400,
      message:'Invalid User'
    }
    
  }
}
deposit=(acno, pswd,amount)=>{
  amount=parseInt(amount);
  if(acno in accDetails){
    if(pswd== accDetails[acno].pswd){
      accDetails[acno].bal+=amount;
      accDetails[acno]['transaction'].push({
        Type:'credit',Amount:amount
      })
      console.log(`data service ${accDetails[acno].bal}`);
      
      return {
        status:true,
        statusCode:200,
        message:`${amount}is credited and balance :${accDetails[acno]['bal']}`
      }
    }
    else{
      // alert('Password Incorrect');
      return{
        
        "status":false,
        statusCode:400,
        message:'Invalid User'
      }
    }
  }
  else{
    // alert('Invalid accDetails')
    return{
      "status":false,
      statusCode:400,
      message:'Invalid User'
    }
  }
}
withdraw=(acno1,pswd1,amount1)=>{
  amount1=parseInt(amount1);
  if(acno1 in accDetails){
    if(pswd1== accDetails[acno1].pswd){
      if(accDetails[acno1].bal>=amount1){
      accDetails[acno1].bal-=amount1;
      //parsing element to transaction array
      accDetails[acno1]['transaction'].push({
        Type:'Debit',Amount:amount1
      })
      // return accDetails[acno1].bal;
      return {
        status:true,
        statusCode:200,
        message:`${amount1}is debited and balance :${accDetails[acno1]['bal']}`
      }
      }else{
        // alert("insufficient balance")
        // return false;
        return{
          "status":false,
          statusCode:400,
          message:'Insufficient balance'
        }
      }
    }
    else{
      // alert('Password Incorrect');
      // return false;
      return{
        "status":false,
        statusCode:400,
        message:'Invalid Password'
      }
    }
  }
  else{
    // alert('Invalid accDetails')
    // return false;
    return{
      "status":false,
      statusCode:400,
      message:'Invalid User'
    }
  }
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