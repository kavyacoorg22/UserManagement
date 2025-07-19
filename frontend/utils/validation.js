export const checkValidation=(name,number,email,password,confirmPassword)=>{
 
  if(!name||!number||!email||!password||!confirmPassword)
  return "Must fill all the column"
 
 if(name.trim()==='')
  return "Name cannot be empty or just space";
  
const isNumber = /^[6-9](?!0{9})\d{9}$/.test(number);
  if(!isNumber) return "Phone number is not valid"

 const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
 if(!isEmail) return "Email not valid"

 const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!?]).{8,}$/.test(password);
 if(!isPassword) return "Password must be 8+ chars with upper, lower, number & symbol"
 if(password!==confirmPassword)
  return "Pasword do not match"

return null;


}