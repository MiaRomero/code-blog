
var blog = {};
blog.articles = articles;

blog.sortArticlesByDate = function () {
  for (var i = 0; i < this.articles.length; i++){
    var date = this.articles[i].publishedOn;
    this.articles[i].publishedOn = Date.parse(date);
  }
  this.articles.sort(function(a,b){
   return b.publishedOn - a.publishedOn;
  });
}

blog.loadBlogPage = function () {
  blog.sortArticlesByDate();
  for (var i = 0; i < blog.articles.length; i++){
    var fullArticle = new CompleteArticle(blog.articles[i]);
    fullArticle.toHTML();
  }
}
