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

//calculates the total number of words per article
stats.calculateWordsPerArticle = function (currentArticleObject) {
  var inBody =  (currentArticleObject.markdown).match(/\S+/gi).length;
  var inTitle = (currentArticleObject.title).match(/\S+/gi).length;
  return inBody + inTitle;
};

//calculates the total number of characters per article
stats.calculateCharsPerArticle = function (currentArticleObject) {
  var inBody =  (currentArticleObject.markdown).match(/[a-z]/gi).length;
  var inTitle = (currentArticleObject.title).match(/[a-z]/gi).length;
  return inBody + inTitle;
};

//calculates the total number of words in an array
stats.calculateTotalWords = function (array) {
  var wordsInObjectArray = $.map(array, stats.calculateWordsPerArticle);
  var totalWords = wordsInObjectArray.reduce(function sum(a, b){
    return a + b;
  });
  return totalWords;
};

//calculates the total number of characters in an array
stats.calculateTotalChars = function (array) {
  var charsInObjectArray = $.map(array, stats.calculateCharsPerArticle);
  var totalChars = charsInObjectArray.reduce(function sum(a, b){
    return a + b;
  });
  return totalChars;
};

//calculate average word length on blog
stats.calculateAverageWordLength = function () {
  var averageWord = Math.round((stats.calculateTotalChars(blog.articles))/(stats.calculateTotalWords(blog.articles)));
  console.log(averageWord);
  return averageWord;
};

//calculate average length of article per author
stats.calculateAverageByAuthor = function () {
  var X = $.map(stats.calculateUniqueAuthors(), function (value){
    var author = value;
    var authArticles = [];
    (blog.articles).forEach(function (cE, index, array) {
      if(array[index].author === author){
        authArticles.push(array[index].markdown);
      }
    });

  });
};



//calculates and displays statistics for blog
stats.calculateStatistics = function (data) {
  blog.articles = data;
  stats.replaceArticleBody();
  $('#totalArticles').text('Total number of articles = ' + blog.articles.length);
  $('#totalAuthors').text('Total unique authors = ' + (stats.calculateUniqueAuthors()).length);
  $('#totalWords').text('Total number of words on the blog = ' + stats.calculateTotalWords(blog.articles));
  $('#averageWord').text('Average word length on blog = ' + stats.calculateAverageWordLength());
  stats.calculateAverageByAuthor();
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
