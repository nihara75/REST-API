const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'Books'  //your db name
});


con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});


//Three routes are used .Home route to display booklist along with their authors.
//Bookname route to display a particular book plus its review.
//Authorname route to display a particular authorname along with his books.




app.get("/",function(req,res){
  console.log("Hey world!");

  con.query('SELECT * FROM BooksL', (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.post("/",function(req,res){

  const bookn=req.body.bookname;
  const authorn=req.body.authorname;
  con.query('INSERT INTO BooksL VALUES (?,?) ',[bookn,authorn], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.delete("/",function(req,res){

  const bookn=req.body.bookname;

  con.query('DELETE FROM BooksL WHERE Books=?',[bookn], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});

app.patch("/",function(req,res){
  const cond=req.body.condition;
  const bookn=req.body.bookname;
  const authorn=req.body.authorname;
  con.query('UPDATE BooksL SET Books=? ,Author=? WHERE Books=? ',[bookn,authorn,cond], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});





app.get("/books/:bookname",function(req,res){
const name=req.params.bookname;

con.query('SELECT * FROM ReviewsL WHERE Books=?',[name], (err,rows,fields) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});


});

app.post("/books/:bookname",function(req,res){

const bookn=req.body.bookn;
 const review=req.body.review;


  con.query('INSERT INTO ReviewsL VALUES (?,?) ',[bookn,review], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.delete("/books/:bookname",function(req,res){

  const review=req.body.review;

  con.query('DELETE FROM ReviewsL WHERE Review=?',[review], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.patch("/books/:bookname",function(req,res){
  const bookn=req.params.bookname;
  const cond=req.body.condition;
  const review=req.body.review;

  con.query('UPDATE ReviewsL SET Books=? ,Review=? WHERE Review=? ',[bookn,review,cond], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});





app.get("/author/:authname",function(req,res){
const name=req.params.authname;

con.query('SELECT Books FROM BooksL WHERE Author=?',[name], (err,rows,fields) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});


});


app.post("/author/:authname",function(req,res){

const bookn=req.body.bookn;
 const authn=req.body.authn;


  con.query('INSERT INTO BooksL VALUES (?,?) ',[bookn,authn], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.delete("/author/:authname",function(req,res){

  const bookn=req.body.bookn;

  con.query('DELETE FROM BooksL WHERE Books=?',[bookn], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});


app.patch("/author/:authname",function(req,res){
  const bookn=req.body.bookname;
  const cond=req.body.condition;
  const authorn=req.params.authname;

  con.query('UPDATE BooksL SET Books=? ,Author=? WHERE Books=? ',[bookn,authorn,cond], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
