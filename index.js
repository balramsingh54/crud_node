var express = require('express')
var app = express();
var mysql = require('mysql');
const bodyparser = require('body-parser');
const server = require('http').createServer(app);
require('./socket.js').connect(server);

app.set('view engine', 'ejs');

var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'BA;42VpXqQ@i+y{&TDFF',
	database: 'crud'
});

conn.connect(function (err) {
	if (err) {
		console.log("database connection failed..!");
	}

	else {
		console.log("database connection successfull..!");
	}
});

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.get('/', function (req, res) {
	res.render('insert');
});


app.post('/insert', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	var sql = `insert into users(user_name, user_email, user_password) values('${name}', '${email}', '${password}')`;

	conn.query(sql, function (err, result) {
		if (err) throw err;

		res.redirect('/show');
		// res.send("<h1> data sent...</h1>");
	})
});


app.get('/show', function (err, res) {
	var sql = `select * from users`;

	conn.query(sql, function (err, result) {
		if (err) throw err;
		res.render('show', { users: result });
	})
})


app.get('/delete/:id', function (req, res) {
	var id = req.params.id;
	// console.log(id);
	var sql = `delete from users where user_id = '${id}'`;
	conn.query(sql, function (err, result) {
		if (err) throw err;
		res.redirect('/show');
	})
});


app.get('/edit/:id', function (req, res) {
	var id = req.params.id;

	var sql = `select * from users where user_id='${id}'`;

	conn.query(sql, function (err, result) {
		if (err) throw err;

		res.render('edit', { user: result });
	})
});


app.post('/update/:id', function (req, res) {
	var id = req.params.id;

	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	console.log(id);

	var sql = `update users set user_name='${name}', user_email='${email}', user_password='${password}' where user_id='${id}'`;


	console.log("query sql", sql)
	conn.query(sql, function (err, result) {
		if (err) throw err;

		res.redirect('/show');
	});

});


server.listen(4000, async () => {
	console.log("this port is running at 4000");
});


