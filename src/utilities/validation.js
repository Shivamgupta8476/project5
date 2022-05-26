const mongoose = require('mongoose');
let objectId = mongoose.Types.ObjectId

//EMAIL VALIDATION BY REJEX
const validateEmail = (email) => {
  return (email).trim().match(
    /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/);
};

//PASSWORD VALIDATION BY REJEX
const validatePassword = (password) => {
  return String(password).trim().match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
};

//STRING VALIDATION BY REJEX
const validateFeild = (name) => {
  return String(name).trim().match(
    /^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/);
};


//STREET VALIDATION BY REJEX
const validateStreet = (name) => {
  return String(name).trim().match(
    /^[a-zA-Z0-9_.-]/);
};


//VALIDATION OF MOBILE NO BY REJEX
const validateNumber = (Feild) => {
  return String(Feild).trim().match
    (/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/);
};


//VALIDATION OF PINCODE BY REJEX
const validatePincode = (pincode) => {
  return String(pincode).trim().match(
    /^(\d{4}|\d{6})$/);
};

//VALIDATION OF OBJECT ID
let isValidObjectId = (value) => {
  return objectId.isValid(value)
};

let isValidBody= (value) => {
  if(Object.keys(value).length===0) return false;
  return true;
}
/*  //VALIDATION OF logolink BY REJEX
const validateprofileImage= (Image) => {
  return String(Image).trim().match
  (/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/);
}; */
/*const isValidSizes = (availableSizes) => {
  return ["S", "XS", "M", "X", "L", "XXL", "XL"].indexOf(availableSizes) !== -1
}
const isRs = (currencyFormat) => {
  return ["Rs"].indexOf(currencyFormat) !== -1

}
const isINR = (currencyId) => {
  return ["INR"].indexOf(currencyId) !== -1

}*/
//Validating currency type
let isValidCurrency = (value) => {
  if (value.trim().toUpperCase() !== "INR") return false;
  return true;
}

//Validating currency format
let isValidCurrencyFormat = (value) => {
  if (value.trim().toUpperCase() !== "₹") return false;
  return true;
}
//Validating size
let isValidSize = (value) => {
  let validSize = ["S", "XS", "M", "X", "L", "XXL", "XL"];
  if (!validSize.includes(value.trim())) return false;
  return true;
}
//Validating boolean type
let isValidBoolean = (value) => {
  console.log(typeof value)
  if (typeof (value) != "boolean") return false;
  return true;
}
module.exports = { validateEmail, validatePassword, validateFeild, validateStreet, validateNumber, validatePincode, isValidObjectId, isValidBody,isValidCurrency, isValidCurrencyFormat,isValidSize,isValidBoolean}