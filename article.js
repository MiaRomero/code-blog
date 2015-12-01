
function CompleteArticle(dataObject) {
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.author = dataObject.author;
  this.authorUrl = dataObject.authorUrl;
  this.publishedOn = dataObject.publishedOn;
  this.body = dataObject.body;
}

CompleteArticle.prototype.calculateDaysAgo = function (date) {
  var milSecondsPerDay = 1000 * 3600 * 24;
  var today = new Date();
  return Math.floor((today-date) / milSecondsPerDay);
}

CompleteArticle.prototype.toHTML = function () {
  var daysAgo = this.calculateDaysAgo(this.publishedOn);
  var $newClone = $('article').filter(':first').clone();

  $newClone.find(".articleTitle").text(this.title);
  $newClone.find(".author").text("By " + this.author);
  $newClone.find(".publishDate").text("Published about " + daysAgo + " days ago");
  $newClone.find(".articleContent").html(this.body);

  $("article:last").after($newClone);
}
