const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + req.method + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', function(req, res){
  res.render('home.hbs',{
      pageTitle: 'Home page',
      welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', function(req, res){
    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
});