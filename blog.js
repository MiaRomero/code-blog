
for (var i = 0; i < blog.articles.length; i++){
  var fullArticle = new CompleteArticle(blog.articles[i]);
  fullArticle.toHTML();
}
