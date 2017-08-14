const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //Port that works with heroku or local

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('unable to append to server.log.')
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcomeMessage: 'Welcome to this awesome site!',
		pageTitle: 'Home Page'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'This is an error message'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
