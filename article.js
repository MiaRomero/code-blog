
function CompleteArticle(dataObject) {
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.author = dataObject.author;
  this.authorUrl = dataObject.authorUrl;
  this.publishedOn = dataObject.publishedOn;
  this.body = dataObject.body;
}

CompleteArticle.prototype.toHTML = function () {

  var $newClone = $('article').filter(':first').clone();

  $newClone.find("#articleTitle").text(this.title);
  $newClone.find("#author").text(this.author);
  $newClone.find("#articleContent").html(fullArticle.body);

  $("article:last").after($newClone);
}
