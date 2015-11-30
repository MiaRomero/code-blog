



function CompleteArticle(dataObject) {
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.author = dataObject.author;
  this.authorUrl = dataObject.authorUrl;
  this.publishedOn = dataObject.publishedOn;
  this.body = dataObject.body;
}

var createdArticlesArray = [];
          console.log(blogArticles);
          console.log(blogArticles[0].title);
          var testArticle = new CompleteArticle(blogArticles[0]);
          console.log(testArticle);

for (var i = 0; i < blogArticles.length; i++){
  var fullArticle = new CompleteArticle(blogArticles[i]);
  createdArticlesArray.push(fullArticle);

  var emptyClone = $("article").clone();
  console.log(emptyClone);

}






/*Article.prototype.toHTML = function() {

  return "<article>" +
  "<h1>" + this.title + "</h1>" +
  "</article>"

}*/
