const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const bodyParser = require('body-parser');
const mailtrap=require('mailtrap')
//const axios=require('axios');
//import fetch from 'node-fetch';
//const fetch=require('node-fetch')
//import axios from 'axios';
//import { useContext } from "react";
//import { Context } from "../../utils/context";
const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
//const mailjet = require('node-mailjet');
// const mailjetClient =require('node-mailjet').connect(
//   'aaf434c19a8811e80b7c93683dfe433d',
//   '6d485addcc34532348d4dbf83ae6a1e1'
// );
// const mailjet = require ('node-mailjet')
// .apiConnect('****************************1234', '****************************abcd')

// app.post('/send-email', async (req, res) => {
//   try {
//     const response = await axios.post('https://api.mailjet.com/v3.1/send', req.body, {
//       headers: {
//         'Content-Type': 'application/json',
//         // Include your Mailjet API key and secret here
//         'Authorization': 'Basic aaf434c19a8811e80b7c93683dfe433d:c6443cfb2a8e9697bb82fa7d2f2e040e',
//       },
//     });

//     res.status(response.status).json(response.data);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });





const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tssmanoj555^",
    database:"strapicom"
})
function updateIsSignedIn(email) {
    const sql = "UPDATE login SET is_signed_in = TRUE WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("Error updating is_signed_in:", err);
        } else {
            console.log("is_signed_in updated successfully.");
        }
    });
}
function logoutAllUsersExcept(email) {
    const sqlUpdateAllUsers = "UPDATE login SET is_signed_in = false WHERE email != ?";
    db.query(sqlUpdateAllUsers, [email], (err, result) => {
        if (err) {
            console.error("Error updating login status for all users:", err);
            //callback(err);
        } else {
            console.log("All users logged out except:", email);
            //callback(null);
        }
    });
}
app.post("/signup",(req,res)=>{
    const sql="insert into login (`name`,`email`,`password`) values (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("errorr")
        }
        return res.json(data);
    })
})

app.post("/login",(req,res)=>{
    //console.log("manoj")
    const sql="select * from login where `email`=? and `password`=?";
    const values=[
        req.body.email,
        req.body.password
    ]
    console.log(req.body.email);
    db.query(sql,values,(err,data)=>{
        if(err){
            return res.json("errorr")
        }
        if(data.length>0){
            //console.log("hello")
            logoutAllUsersExcept(req.body.email);
            updateIsSignedIn(req.body.email);
            //setUser(req.body.email);
            return res.json("success")
        }
        else{
            return res.json("fail")
        }
        return res.json(data);
    })
})
app.post('/api/complaints', (req, res) => {
  // Access the form data from req.body
  const { name, email, phoneNumber, complaint } = req.body;
  console.log("jhbuuob")
  // Do something with the data (e.g., save it to a database)
  // For demonstration purposes, we'll just send back a response
  res.json({
    "data": {
      "Complaint": "mother gbhynuimsbcsv9tv8c75ex7urcccr67rd",
      "Phnum": 1234567
    }
  });
});
app.post("/updateInCart", (req, res) => {
    const { email, cartItems } = req.body;
    
    // Update the 'incart' column in the database for the specified user
    const sql = "UPDATE login SET incart = ? WHERE email = ?";
    db.query(sql, [JSON.stringify(cartItems), email], (err, result) => {
      if (err) {
        console.error("Error updating incart:", err);
        return res.status(500).json({ message: "Error updating incart" });
      }
      console.log("incart updated successfully.");
      return res.json({ message: "incart updated successfully" });
    });
  });
  
  app.post("/updateLikedItems", (req, res) => {
    const { email, likedItems } = req.body;
    
    // Update the 'liked_items' column in the database for the specified user
    const sql = "UPDATE login SET liked_items = ? WHERE email = ?";
    db.query(sql, [JSON.stringify(likedItems), email], (err, result) => {
      if (err) {
        console.error("Error updating liked_items:", err);
        return res.status(500).json({ message: "Error updating liked_items" });
      }
      console.log("liked_items updated successfully.");
      return res.json({ message: "liked_items updated successfully" });
    });
});

app.get("/getLikedItems/:email", (req, res) => {
    const email = req.params.email;
    
    // Fetch the 'liked_items' column data for the specified user
    const sql = "SELECT liked_items FROM login WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error fetching liked_items:", err);
        return res.status(500).json({ message: "Error fetching liked_items" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const likedItems = JSON.parse(result[0].liked_items || "[]");
      return res.json({ likedItems });
    });
  });

  app.get("/getUserCart/:email", (req, res) => {
    const email = req.params.email;
  
    // Fetch the user's 'incart' data from the database
    const sql = "SELECT incart FROM login WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error("Error fetching user's cart data:", err);
        return res.status(500).json({ message: "Error fetching user's cart data" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userCartData = JSON.parse(result[0].incart);
      return res.json({ cartItems: userCartData });
    });
  });

  
app.get('/getSignedInUser', (req, res) => {
    const sql = 'SELECT email FROM login WHERE is_signed_in = true';
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching signed-in user:", err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length > 0) {
                const userEmail = result[0].email; // Assuming there's only one signed-in user
                res.json({ email: userEmail });
            } else {
                res.json({ email: null });
            }
        }
    });
});
app.post('/logout', (req, res) => {
    const userEmail = req.body.email;
    const updateSql = 'UPDATE login SET is_signed_in = false WHERE email = ?';
  
    db.query(updateSql, [userEmail], (err, result) => {
      if (err) {
        console.error('Error updating is_signed_in:', err);
        return res.status(500).json({ message: 'Error updating is_signed_in' });
      } else {
        console.log('is_signed_in updated successfully.');
        return res.status(200).json({ message: 'Logout successful' });
      }
    });
  });
app.listen(8081,()=>{
    console.log("listening");
})