import express, {Request, Response, NextFunction, request} from 'express';
// var express = require('express');
const router = express.Router();
import {Proto} from "../interface";
import {v4 as uuidv4} from "uuid";
import { prototype } from "events";
import { AnyAaaaRecord } from 'dns';
import fs from 'fs';
const fromDataJason = require("../routes/data.json");



/* GET users listing. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  if(fromDataJason.length === 0){
    res.status(404).send("Page not found");
  }else {
    res.status(200).send(fromDataJason);
  }
});

router.get('/:id',(req:Request, res:Response,next:NextFunction)=>{
  const singleId = fromDataJason.find((el:any)=> el.id === +req.params.id)
  const valueOfIndex = fromDataJason.findIndex((el:any)=> el.id===+req.params.id)
  if(!singleId){
    res.send("user not available")
  }else{
    res.send(fromDataJason[valueOfIndex]);
  }
});
  //This is to delete from the data base
router.delete('/:id',(req:Request, res:Response,next:NextFunction)=>{
  
const id = +req.params.id;
 const user = fromDataJason.filter((user:any)=> user.id !== id);
 console.log(user);
//  console.log(fromDataJason);
fs.writeFileSync("./lib/routes/data.json", JSON.stringify(user, null, 4), "utf-8")
res.send(`user with an id ${id} deleted from the database`);
});

//This is to post to the data base
router.post('/',function (req:Request, res:Response, next:NextFunction){
  const id = fromDataJason.length > 0 ? +fromDataJason[fromDataJason.length - 1].id + 1 : 1;
  const {
  organization,
  products,
  marketValue,
  address,
  ceo,
  country,
  noOfEmployees,
  employees,
  } = req.body;
  
  const newpostdata = {
  organization: organization || "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  products: products || [],
  marketValue: marketValue || "",
  address: address || "",
  ceo: ceo || "",
  country: country || "",
  id: id,
  noOfEmployees: noOfEmployees || 0,
  employees: employees || [],
  };
  fromDataJason.push(newpostdata);
  // console.log(dataPath);
  fs.writeFile(
  "./lib/routes/data.json",
  JSON.stringify(fromDataJason, null, " "),
  (err) => {
  if (err) throw err;
  console.log("Saved!");
  }
  );
  res.send(newpostdata);
  

});

router.patch('/:id',(req:Request, res:Response,next:NextFunction)=>{
  const id = +req.params.id;
  const userupdate = fromDataJason.find((user:any)=>user.id ===id)
  const {
    organization,
    products,
    marketValue,
    address,
    ceo,
    country,
    noOfEmployees,
    employees,
    } = req.body;
if(organization)userupdate.organization = organization;
if(products)userupdate.products = products;
if(marketValue)userupdate.marketValue = marketValue;
if(address)userupdate.address = address;
if(ceo)userupdate.ceo = ceo;
if(country)userupdate.country = country;
if(noOfEmployees)userupdate.noOfEmployees = noOfEmployees;
if(employees)userupdate.employees = employees;
fs.writeFile(
  "./lib/routes/data.json",
  JSON.stringify(fromDataJason, null, " "),
  (err) => {
  if (err) throw err;
  console.log("Saved!");
  }
  );
res.send(`user with an id ${id} has been updated`);
  });







module.exports = router;