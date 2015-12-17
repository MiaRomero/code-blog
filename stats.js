var stats = {};

//callback function: takes author from each article object and pushes to AllAuthors array
stats.pushToAllAuthorsArray = function (object, index, array) {
  this.push(array[index].author);
};

//callback function: creates array of unique authors
stats.keepUnique = function (elementValue, elementIndex, array){
  return array.indexOf(elementValue) === elementIndex;
};

//creates array of unique authors
stats.calculateUniqueAuthors = function () {
  var allAuthors = [];
  blog.articles.map(stats.pushToAllAuthorsArray, allAuthors);
  var uniqueAuthors = allAuthors.filter(stats.keepUnique);
  return uniqueAuthors;
};

//callback function: removes markdown characters from article body
stats.undoMarkdown = function (object, index, array) {
  var newBody = marked(array[index].markdown);
  array[index].markdown = $(newBody).text();

};

//replaces article body with "un"markdowned version
stats.replaceArticleBody = function () {
  (blog.articles).forEach(stats.undoMarkdown, blog.articles);

};







//calculates the total number of words or characters per article
stats.calculatePerArticle = function (currentArticleObject, regex) {
  var inBody =  (currentArticleObject.markdown).match(/\S+/gi).length;
  var inTitle = (currentArticleObject.title).match(/\S+/gi).length;
  return inBody + inTitle;
};

//word regex= /\S+/gi
//letter regex= /[a-z]+/gi

stats.calculateTotalWords = function () {
  var wordsInBodyArray = $.map(blog.articles, calculatePerArticle(currentValue, ))
}



stats.calculateWORDS = function () {
  // var wordsPerArticleArray = $.map(blog.articles, stats.calculateWordsPerObject(currentValue));
  var wordsPerArticleArray = [];
  for(var i = 0; i < blog.articles.length; i++){
    wordsPerArticleArray.push(stats.calculateWordsPerObject(blog.articles[i]));
  }
  return wordsPerArticleArray;
};

//var letters =  value.match(/[a-z]+/gi).length;

//calculates statistics for blog
stats.calculateStatistics = function (data) {
  blog.articles = data;
  $('#totalArticles').text('Total number of articles = ' + blog.articles.length);
  $('#totalAuthors').text('Total unique authors = ' + (stats.calculateUniqueAuthors()).length);

  stats.replaceArticleBody();
  console.log(stats.calculateWordsPerArticle(blog.articles[8]));



  // console.log(stats.calculateWordsPerObject());
  // console.log(stats.calculateItemPerObject());
};

//gets blog data from json file
stats.getData = function () {
  console.log ('testing get data');
  $.getJSON('data/hackerIpsum.json')

    .done(stats.calculateStatistics)

    .fail( function () {
      console.log('you suck maria');
    });
};

stats.getData();
