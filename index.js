// server.js
const express = require('express');
const path = require('path');
//const { title } = require('process');
const { rootCertificates } = require('tls');
const DBHandler= require('./database')
const app = express();
const PORT = 5000;
const db= new DBHandler()
app.use(express.urlencoded({extended: true}));  
app.use(express.json());  //this is to inform nodejs application that the data format is json

app.set('view engine', 'ejs');   //this will set the view engine you are using
app.use(express.static(__dirname+'/public'));


// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file when visiting the root of the site
app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.render("index",{title:"Welcome"})
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// For contact page
app.get('/contact', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'contact.html'));
    let rows=db.getContact()
    console.log(rows)
    res.render('contact',{title:"Contact",contact:rows})
});

// For events page
app.get('/events', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'events.html'));
    res.render('events',{title:"Events"})
});

// For faq page
app.get('/faq', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'faq.html'));
    res.render("faq",{title:"FAQ"})
});

// For guests page
app.get('/guests', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'guests.html'));
    res.render('guests',{title:"Guets"})
});

// For about page
app.get('/about', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'guests.html'));
    res.render('about',{title:"About"})
});

