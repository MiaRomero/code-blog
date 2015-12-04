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
   * Clones the article element, formats the clone with the apporpriate info
   * from the oject that calls it, and inserts it into the DOM.
   */
CompleteArticle.prototype.toHTML = function () {
  var daysAgo = this.calculateDaysAgo(this.milliDate);
  var $newClone = $('article:last').clone();

  $newClone.find('.articleTitle').text(this.title);
  $newClone.find('.author').html('<p>'+'By '+'<a href= "' + this.authorUrl + '">' + this.author + '</a></p>');
  $newClone.find('.publishDate').text('Published ' + daysAgo + ' days ago on ' + this.publishedOn);
  $newClone.find('.articleContent').html(this.body);
  $newClone.find('.category').text(this.category).hide();
  $newClone.find('.readMore').text('Read More');
  $newClone.find('.readLess').text('Read Less');

  $('article:last').after($newClone);
};
