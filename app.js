// ilk tanimlar
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

// global degiskenler
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.locals._ = _;

let postsArray = [{title:"Hacerim", content:"Bebislerrrr"}];

// global fonksiyonlar

// Search for post.
// parameter: postId: String
// returns: postsArray in icerisinde var olan objelerden birini: {title: deger, content: deger}
function searchPost(postId) {
  return postsArray.find(x => _.lowerCase(x.title) === _.lowerCase(postId));
}

// Search for post.
// parameter: postId: String
// returns: postsArray in icerisinde var olan objelerden birini: {title: deger, content: deger}
function searchPost2(postId) {
  for (let i = 0; i < postsArray.length; i++) {
    if (_.lowerCase(postsArray[i].title) === _.lowerCase(postId)) {
      return postsArray[i];
    }
  }
  return undefined;
}

// app fonksiyonlari
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// Home page
app.get("/", function (req, res) {
  // getting referer page name
  let referer = req.headers.referer;
  // setting boolean
  let isComingFromCompose = false;
  // check if referer name includes /compose
  if (referer && referer.includes("/compose")) {
    isComingFromCompose = true;
  }
  // defining variables that will be sent to ejs file
  let variableObject = {
    homeCont: homeStartingContent,
    posts: postsArray,
    showAlert: isComingFromCompose
  }

  //rendering home.ejs page with variables
  res.render("home", variableObject);
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutCont: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactCont: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  let postTitle = req.body.postTitle;
  let postBody = req.body.postBody;

  const post = {
    title: postTitle,
    content: postBody
  }
  postsArray.push(post);
  res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
  // Searching if post exists
  let postFound = searchPost(req.params.postId);
  // check if post found
  if (postFound != undefined) {
    res.render("post", postFound);
  }

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});