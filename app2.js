const express = require("express");
const bodyParser = require("body-parser");

const users = [
  {
    name: "Pranav Agarwal",
    email: "pranavagarwal567@gmail.com",
    password: "p",
    age: "21",
    fav_book: "Bhagavad Gita",
  },
  {
    name: "Rakshit Gujrati",
    email: "rakshit1000@gmail.com",
    password: "password",
    age: "21",
    fav_book: "The Psychology of Money",
  },
  {
    name: "Ashita Goyal",
    email: "ashita1000@gmail.com",
    password: "password",
    age: "21",
    fav_book: "Fifty Shades of Grey",
  },
  {
    name: "Saksham",
    email: "saksham1000@gmail.com",
    password: "password",
    age: "21",
    fav_book: "Absolutely on Music",
  },
  {
    name: "Saumya Gupta",
    email: "saumya1000@gmail.com",
    password: "password",
    age: "21",
    fav_book: "In Search of Lost Time",
  },
];

let loggedin = [
  {
    name: "Pranav Agarwal",
    email: "pranav567@gmail.com",
    password: "p",
    age: "21",
    fav_book: "Bhagavad Gita",
  },
];
const books = [
  {
    bookName: "Rudest Book Ever",
    bookAuthor: "Shwetabh Gangwar",
    bookPages: 200,
    bookPrice: 240,
    bookleft: 30,
    bookState: "Available",
  },
  {
    bookName: "Do Epic Shit",
    bookAuthor: "Ankur Wariko",
    bookPages: 200,
    bookPrice: 240,
    bookleft: 100,
    bookState: "Available",
  },
];

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("ho", {
    data: loggedin,
  });
});

app.post("/logout", (req, res) => {
  loggedin = [
    {
      name: "",
      email: "",
      password: "",
      age: "",
      fav_book: "",
    },
  ];
  res.redirect("/");
});

app.get("/login", function (req, res) {
  res.render("login", {
    data: users,
  });
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      loggedin = [{
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        fav_book: user.fav_book,
      }];
    } else {
    }
  });
  res.render("ho", {
    data: loggedin,
  });
});

app.get("/form", function (req, res) {
  res.render("form", {
    data: loggedin,
  });
});

app.post("/form", (req, res) => {
  users.push({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    fav_book: req.body.fav_book,
  });

  res.send(`Thank you for registering ` + req.body.name);
});

app.get("/project", function (req, res) {
  res.render("hom", {
    data: loggedin,
  });
});

app.post("/project", (req, res) => {
  const inputBookName = req.body.bookName;
  const inputBookAuthor = req.body.bookAuthor;
  const inputBookPages = req.body.bookPages;
  const inputBookPrice = req.body.bookPrice;

  books.push({
    bookName: inputBookName,
    bookAuthor: inputBookAuthor,
    bookPages: inputBookPages,
    bookPrice: inputBookPrice,
    bookState: "Available",
  });

  res.render("hom", {
    data: books,
  });
});

app.post("/issue", (req, res) => {
  var requestedBookName = req.body.bookName;
  books.forEach((book) => {
    if (book.bookName == requestedBookName) {
      book.bookleft--;
      book.bookState = "Issued/ Available";
      if (book.bookleft <= 0) book.bookleft = 0;
      book.bookState = "Issued";
    }
  });
  res.render("hom", {
    data: books,
  });
});

app.post("/return", (req, res) => {
  var requestedBookName = req.body.bookName;
  books.forEach((book) => {
    if (book.bookName == requestedBookName) {
      book.bookleft++;
      book.bookState = "Available";
    }
  });
  res.render("hom", {
    data: books,
  });
});

app.post("/delete", (req, res) => {
  var requestedBookName = req.body.bookName;
  var j = 0;
  books.forEach((book) => {
    j = j + 1;
    if (book.bookName == requestedBookName) {
      books.splice(j - 1, 1);
    }
  });
  res.render("hom", {
    data: books,
  });
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
