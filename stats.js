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

//calculates the total number of words per article object
stats.calculateWordsPerObject = function () {
  var wordsPerKey = $.map(blog.articles, function getWordsPerKey(Currentvalue, index, array){
    console.log('this is value:  ' + Currentvalue);
    var wordsInKey =  Currentvalue[index].match(/\S+/gi).length;
          //console.log('this is words in key: ' + wordsInKey);
          //var letters =  value.match(/[a-z]+/gi).length;
          //console.log('these are key letter count:  ' + letters ) ;
    return wordsInKey;
          //console.log('this is to string: ' + blog.articles.toString());
  });
  var wordsPerObject = wordsPerKey.reduce(function sum(a, b){
    return a + b;
  });
  return wordsPerObject;
};

//calculates statistics for blog
stats.calculateStatistics = function (data) {
  blog.articles = data;
  $('#totalArticles').text('Total number of articles = ' + blog.articles.length);
  $('#totalAuthors').text('Total unique authors = ' + (stats.calculateUniqueAuthors()).length);

  stats.replaceArticleBody();

  console.log(stats.calculateWordsPerObject());
  console.log(stats.calculateItemPerObject());
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
