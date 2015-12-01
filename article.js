



function CompleteArticle(dataObject) {
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.author = dataObject.author;
  this.authorUrl = dataObject.authorUrl;
  this.publishedOn = dataObject.publishedOn;
  this.body = dataObject.body;
}

function toHTML(fullArticle) {

    var $newClone = $('article').filter(':first').clone();

    $newClone.find("#articleTitle").text(fullArticle.title);
    $newClone.find("#author").text(fullArticle.author);
    $newClone.find("#articleContent").html(fullArticle.body);


    $("article:last").after($newClone);




}

//var createdArticlesArray = [];


for (var i = 0; i < blogArticles.length; i++){
  var fullArticle = new CompleteArticle(blogArticles[i]);
                  //createdArticlesArray.push(fullArticle);

  toHTML(fullArticle);




}
