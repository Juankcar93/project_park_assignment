// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config()
//const { title } = require('process');
const { rootCertificates } = require('tls');
const DBHandler= require('./database');
const { title } = require('process');
const { sign } = require('crypto');
const app = express();
const PORT = process.env.PORT || 5000;
const db= new DBHandler()
app.use(express.urlencoded({extended: true}));  
app.use(express.json());  //this is to inform nodejs application that the data format is json

app.set('view engine', 'ejs');   //this will set the view engine you are using
app.use(express.static(__dirname+'/public'));
// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file when visiting the root of the site
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.render("index",{title:"Welcome ",isIndexPage: true})
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// For contact page
app.get('/contact', async (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'contact.html'));
    let rows= await db.getContact()
    //console.log(rows)
    res.render('contact',{title:"Contact",contact:rows[0]})
});

app.post('/contact', async (req, res) => {
   try{
    console.log(req.body)
    const {first_name,last_name,message}= req.body;
    console.log([first_name,last_name,message])
    await db.insertContactInformation(first_name,last_name,message)
    res.status(200).json({success:true,message:"Contact saved successfully",title:"contacts"})
   }catch(error){
    res.status(500).json({success:false,message:"Failed to save contact",error:error.message}) 
   }
});

// For events page
app.get('/events', async (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'events.html'));
    try{
        const eventData=await db.getEvents()
        //res.status(200).json({success:true,message:"events retrive successfully",title:"Events",eventData:eventData})
        res.render('events',{title:"Events",eventData:eventData})
       }catch(error){
        res.status(500).json({success:false,message:"Failed to retive events",error:error.message}) 
       }
    
});

// For faq page
app.get('/faq', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'faq.html'));
    res.render("faq",{title:"FAQ"})
});

// For Attractions page
app.get('/attractions', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
    res.render('attractions',{title:"Attractions"})
});

// For about page
app.get('/about', async (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'guests.html'));
    //res.render('about',{title:"About"})
    let rows= await db.getAboutUs()
    res.render('about',{title:"About",aboutData:rows[0]})
});

