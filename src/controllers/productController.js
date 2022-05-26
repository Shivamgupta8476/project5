const ProductModel = require("../models/productModel")
const {validateStreet,isValidBody,isValidSizes, } = require("../utilities/validation");
const mongoose = require('mongoose')
const {uploadFile} = require('../utilities/uploadFile');
const productModel = require("../models/productModel");


//.............................................PHASE (2) POST /products................................................


const createProduct = async (req, res) => {
    try {

     const data = req.body;
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, message: "Feild Can't Empty.Please Enter Some Details" });
      }

      let {title,description,price,currencyId,currencyFormat,isFreeShipping,style,availableSizes,installments,isDeleted}=data

      if (!title) {
          return res.status(400).send({ status: false, message: "Title is missing" });
        }

      //Title validation by Rejex
        if (!validateStreet(data.title)) {
          return res.status(400).send({ status: false, message: "Invalid Title", });
        }

        const findtitle = await ProductModel.findOne({ title: title }); //title exist or not


        if (findtitle) {
          return res.status(400).send({ status: false, message: `${data.title} Already Exist.Please,Give product Title` })
        }


      if (!description) {
          return res.status(400).send({ status: false, message: "Description is missing" });
        }

      //Title validation by Rejex
        if (!validateStreet(description)) {
          return res.status(400).send({ status: false, message: "Invalid description", });
        }

        if (!price) {
          return res.status(400).send({ status: false, message: "Price Not Given" });
        }

         if (typeof (price) != "Number" && price<0) {
            return res.status(400).send({ status: false, message: "Invalid Price Format" });
          }

        if(data.currencyId){
            if(currencyId.trim().toUpperCase()!="INR" ){
                return res.status(400).send({ status: false, message: "Invalid CurrencyId" });
         }
        }

         if(currencyFormat){
            if(currencyFormat.trim()!="₹" ){
                return res.status(400).send({ status: false, message: "Invalid currencyFormat" });
         }
        }
       /*  if(isFreeShipping){
       if(typeof (isFreeShipping)!="boolean"){
            return res.status(400).send({ status: false, message: "Invalid isFreeShipping Format.It must be true or false" });
        }
        }*/
        if(style){
            if (!validateStreet(style)) {
                return res.status(400).send({ status: false, message: "Invalid Style Format", });
              }
            }

          if (data.availableSizes) {
    //let validSize = ["S", "XS","M","X", "L","XXL", "XL"];
    //for (let i=0;i<data.availableSizes.length;i++)
    //console.log(data.availableSizes)
    if (!validSize.includes(data.availableSizes)){
    return res.status(400).send({ status: false, message: "AvailableSizes should be of S,XS,M,X, L,XXL,XL" });
    }
        }


     if (installments) {
            if(typeof(installments)!="Number" && installments<0 ){
                return res.status(400).send({ status: false, message: "Invalid installments Format" });

            }
        }

     /*if (isDeleted) {
        if (typeof (isDeleted) != "boolean") {
          return res.status(400).send({ status: false, message: "Invalid Input of isDeleted.It must be true or false " });
        }
        if (isDeleted == true) {
          return res.status(400).send({ status: false, message: "isDeleted must be false while creating Product" });
        }
      }*/


        let files = req.files
       if (files && files.length > 0) {
      let dirName="productImage_v01";
      let uploadedFileURL = await uploadFile(files[0],dirName)
      data.productImage = uploadedFileURL
    }
    else {
      return res.status(400).send({ msg: "No file found" })
    }

         const Product = await productModel.create(data);
      return res.status(201).send({ status: true, message: "Product created successfully", data:Product });
    }

    catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };

  /////////-----------------------putapi product------------------------------///////

  const updateProduct = async function (req, res) {
    try {
        const productId = req.params.productId
        const data = req.body

        if (!isValidObjectId(productId)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Product id" })
        }

        if (!isValidBody(data)) {
            if (!(isValidBody(req.files)))
                return res.status(400).send({ status: false, msg: "Please enter Data to be updated" })
        }

        let { title, description, price, currencyId, currencyFormat, availableSizes } = data

        let checkProduct = await productModel.findOne({ _id: productId, isDeleted: true })
        if (checkProduct) {
            return res.status(400).send({ status: false, msg: "Product Already Deleted" })
        }

            if (!title) {
                return res.status(400).send({ status: false, msg: "Please enter title" })
            }

            const titleUsed = await productModel.findOne({ title:title })
            if (titleUsed) {
                return res.status(400).send({ status: false, msg: "title must be unique" })
            }
    
            if (!description) {
                return res.status(400).send({ status: false, msg: "Please enter description" })
            }
        
            if (!price) {
                return res.status(400).send({ status: false, msg: "Please enter Price" })
            }

            if (!currencyId) {
                return res.status(400).send({ status: false, msg: "Please enter currencyId" })
            

            if (!isINR (currencyId)) {
                return res.status(400).send({ status: false, msg: "Currencry Id must be INR" })
            }
        }

       /* if (currencyFormat) {
            if (isValidBody(currencyFormat)) {
                return res.status(400).send({ status: false, msg: "Please enter currency format" })
            }

            if (!isRs(currencyFormat)) {
                return res.status(400).send({ status: false, msg: "Currency Format must be Rs" })
            }
        }*/

       /* if (availableSizes) {
            if (!isValidSizes(availableSizes)) {
                return res.status(400).send({ status: false, msg: "Please enter available sizes" })
            }

            if (!isValidSizes(availableSizes)) {
                return res.status(400).send({ status: false, msg: "Available Sizes should be from ['S', 'XS', 'M', 'X', 'L', 'XXL', 'XL']" })
            }
        }
        */

        if (req.files) {
            let files = req.files
            if (files && files.length > 0) {
                var uploadedFileURL = await aws.uploadFile(files[0])
            }
        }

        const productUpdated = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, { $set: data }, { new: true })
        if (!productUpdated) {
            return res.status(404).send({ status: false, msg: "No Such Product exists" })
        }

        productUpdated["productImage"] = uploadedFileURL

        return res.status(200).send({ status: true, msg: "Data Updated Succesfully", data: productUpdated })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}

  module.exports.createProduct = createProduct
  module.exports.updateProduct= updateProduct

