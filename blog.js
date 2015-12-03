
var blog = {};
blog.articles = articles;

/**
   * Converts each publishedOn date in article objects to milliseconds, sorts
   * article array by publishedOn date, descending.
   */
blog.sortArticlesByDate = function () {
  for (var i = 0; i < this.articles.length; i++){
    var date = this.articles[i].publishedOn;
    this.articles[i].milliDate = Date.parse(date);
  }
  this.articles.sort(function(a,b){
    return b.milliDate - a.milliDate;
  });
};

blog.truncateArticles = function () {
  $('div p:not(:first-child)').hide();
  $('.readMore').show();
  $('.readLess').hide();
};

/**
   * Creates a completed article object from each object in article array,
   * posts each to webpage.
   */
blog.loadBlogPage = function () {
  blog.sortArticlesByDate();
  for (var i = 0; i < blog.articles.length; i++){
    var fullArticle = new CompleteArticle(blog.articles[i]);
    fullArticle.toHTML();
  }
  blog.truncateArticles();
};
