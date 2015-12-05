/**
   * Creates new completed artile objects
   * @param dataObject - an ojbect from the blog.articles array
   */
function CompleteArticle(dataObject) {
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.author = dataObject.author;
  this.authorUrl = dataObject.authorUrl;
  this.publishedOn = dataObject.publishedOn;
  this.body = dataObject.body;
  this.milliDate = dataObject.milliDate;
}

/**
   * Calculates the number of days that have passed since "date"
   * @param date - object.milliDate (in milliseconds) to be calculated
   */
CompleteArticle.prototype.calculateDaysAgo = function (date) {
  var milSecondsPerDay = 1000 * 3600 * 24;
  var today = new Date();
  return Math.floor((today - date) / milSecondsPerDay);
};

/**
   * Takes the new object, adds the daysAgo property, uses the handlebars
   * template to insert it into the DOM.
   */
CompleteArticle.prototype.toHTML = function () {
  this.daysAgo = this.calculateDaysAgo(this.milliDate);

  var articleTemplateScript = $('#article-template').html();
  var articleTemplate = Handlebars.compile(articleTemplateScript);
  var articleHTML = articleTemplate(this);
  $('.articles').append(articleHTML);
};
