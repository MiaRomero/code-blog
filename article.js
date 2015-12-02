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
}

/**
   * Calculates the number of days that have passed since "date"
   * @param date - date to be calculated
   */
CompleteArticle.prototype.calculateDaysAgo = function (date) {
  var milSecondsPerDay = 1000 * 3600 * 24;
  var today = new Date();
  return Math.floor((today-date) / milSecondsPerDay);
};

/**
   * Clones the article element, formats the clone with the apporpriate info
   * from the oject that calls it, and inserts it into the DOM.
   */
CompleteArticle.prototype.toHTML = function () {
  var daysAgo = this.calculateDaysAgo(this.publishedOn);
  var $newClone = $('article').filter(':last').clone();

  $newClone.find('.articleTitle').text(this.title);
  $newClone.find('.author').html('<div><a href= "' + this.authorUrl + '">By '+ this.author + '</a></div>');
  $newClone.find('.publishDate').text('Published about ' + daysAgo + ' days ago');
  $newClone.find('.articleContent').html(this.body);
  $newClone.find('.category').text(this.category).hide();
  $newClone.find('.readMore').text('Read More');
  $newClone.find('.readLess').text('Read Less');

  $('article:last').after($newClone);
};
