"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// var express = require('express');
const router = express_1.default.Router();
const fs_1 = __importDefault(require("fs"));
const fromDataJason = require("/Users/decagon/Documents/week-6-node-008-kunlegboye/src/routes/data.json");
/* GET users listing. */
router.get('/', function (req, res, next) {
    if (fromDataJason.length === 0) {
        res.status(404).send("Page not found");
    }
    else {
        res.status(200).send(fromDataJason);
    }
});
router.get('/:id', (req, res, next) => {
    const singleId = fromDataJason.find((el) => el.id === +req.params.id);
    const valueOfIndex = fromDataJason.findIndex((el) => el.id === +req.params.id);
    if (!singleId) {
        res.send("user not available");
    }
    else {
        res.send(fromDataJason[valueOfIndex]);
    }
});
//This is to delete from the data base
router.delete('/:id', (req, res, next) => {
    const id = +req.params.id;
    const user = fromDataJason.filter((user) => user.id !== id);
    console.log(user);
    //  console.log(fromDataJason);
    fs_1.default.writeFileSync("/Users/decagon/Documents/week-6-node-008-kunlegboye/src/routes/data.json", JSON.stringify(user, null, 4), "utf-8");
    res.send(`user with an id ${id} deleted from the database`);
});
//This is to post to the data base
router.post('/', function (req, res, next) {
    const id = fromDataJason.length > 0 ? +fromDataJason[fromDataJason.length - 1].id + 1 : 1;
    const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees, } = req.body;
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
    fs_1.default.writeFile("/Users/decagon/Documents/week-6-node-008-kunlegboye/src/routes/data.json", JSON.stringify(fromDataJason, null, " "), (err) => {
        if (err)
            throw err;
        console.log("Saved!");
    });
    res.send(newpostdata);
});
router.patch('/:id', (req, res, next) => {
    const id = +req.params.id;
    const userupdate = fromDataJason.find((user) => user.id === id);
    const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees, } = req.body;
    if (organization)
        userupdate.organization = organization;
    if (products)
        userupdate.products = products;
    if (marketValue)
        userupdate.marketValue = marketValue;
    if (address)
        userupdate.address = address;
    if (ceo)
        userupdate.ceo = ceo;
    if (country)
        userupdate.country = country;
    if (noOfEmployees)
        userupdate.noOfEmployees = noOfEmployees;
    if (employees)
        userupdate.employees = employees;
    fs_1.default.writeFile("/Users/decagon/Documents/week-6-node-008-kunlegboye/src/routes/data.json", JSON.stringify(fromDataJason, null, " "), (err) => {
        if (err)
            throw err;
        console.log("Saved!");
    });
    res.send(`user with an id ${id} has been updated`);
});
module.exports = router;
