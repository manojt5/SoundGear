import React from 'react'

function Loginvalidation(values) {
  let error={}
  const mail_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  if(values.email===""){
    error.email="Email shouldn't be empty"
  }
  else if(!mail_pattern.test(values.email)){
    error.email="Incorrect email format"
  }
  else{
    error.email="";
  }

  if(values.password===""){
    error.password="Password shouldn't be empty"
  }
  else if(!password_pattern.test(values.password)){
    error.password="Must include Capital and Small letters.Atleast 8 characters"
  }
  else{
    error.password="";
  }
  return error;
}

export default Loginvalidation