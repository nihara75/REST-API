const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nihar@25*',
    database: 'Books'  //your db name
});


con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});




//Book routes.


app.get("/book",function(req,res){
  console.log("kui");
  const authid=req.query.authid;
  if(authid){




     console.log(authid);
    con.query('SELECT bookname FROM Books WHERE authid=?',[authid], (err,rows,fields) => {
      if(err) throw err;

      console.log('Data received from Db:');
      console.log(rows);
    });

  }
  else{

  con.query('SELECT bookname FROM Books', (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });
}

});



app.get("/book/:bookid",function(req,res){
const name=req.params.bookid;

con.query('SELECT bookname,genre FROM Books WHERE bookid=?',[name], (err,rows,fields) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});


});


app.post("/book",function(req,res){

const bookn=req.body.bookn;
 const genre=req.body.genre;
 const id=req.body.authid;


  con.query('INSERT INTO Books (bookname,genre,authid) VALUES (?,?,?) ',[bookn,genre,id], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.delete("/book/:bookid",function(req,res){

  const id=req.params.bookid;

  con.query('DELETE FROM Books WHERE bookid=?',[id], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.put("/book/:bookid",function(req,res){
  const bookn=req.params.bookid;
  const bookname=req.body.bookname;
  const genre=req.body.genre;

  con.query('UPDATE Books SET bookname=? ,genre=? WHERE bookid=? ',[bookname,genre,bookn], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});



//Review routes.

app.get("/review",function(req,res){
  console.log("Hey world!");

  const bookid=req.query.bookid;
  if(bookid){




    con.query('SELECT review FROM Reviews WHERE bookid=?',[bookid], (err,rows,fields) => {
      if(err) throw err;

      console.log('Data received from Db:');
      console.log(rows);
    });
  }
else{
  con.query('SELECT review FROM Reviews', (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


}

});





app.get("/review/:reviewid",function(req,res){
const name=req.params.reviewid;

con.query('SELECT review FROM Reviews WHERE reviewid=?',[name], (err,rows,fields) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});


});

app.post("/review",function(req,res){

const review=req.body.review;
const bookid=req.body.bookid;


  con.query('INSERT INTO Reviews (bookid,review) VALUES (?,?) ',[bookid,review], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.delete("/review/:reviewid",function(req,res){

  const id=req.params.reviewid;

  con.query('DELETE FROM Reviews WHERE reviewid=?',[id], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.put("/review/:reviewid",function(req,res){
const id=req.params.reviewid;
const review=req.body.review;
//const bookid=req.body.bookid;
  con.query('UPDATE Reviews SET review=? WHERE reviewid=? ',[review,id], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});




//Author routes.




app.get("/author",function(req,res){
  console.log("Hey world!");

  con.query('SELECT authname FROM Author', (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});


app.get("/author/:authorid",function(req,res){
const id=req.params.authorid;

con.query('SELECT authname FROM Author  WHERE authid=?',[id], (err,rows,fields) => {
  if(err) throw err;

  console.log('Data received from Db:');
  console.log(rows);
});


});


app.post("/author",function(req,res){

const authn=req.body.authorname;


  con.query('INSERT INTO Author (authname) VALUES (?) ',[authn], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.delete("/author/:authorid",function(req,res){

  const id=req.params.authorid;

  con.query('DELETE FROM Author WHERE authid=?',[id], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });


});

app.put("/author/:authorid",function(req,res){
  const name=req.body.authorname;
  const id=req.params.authorid;
  con.query('UPDATE Author SET authname=? WHERE authid=? ',[name,id], (err,rows,fields) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
  });

});

























app.listen(3000, function() {
  console.log("Server started on port 3000");
});
