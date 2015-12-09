var stats = {};

stats.pushToAllAuthorsArray = function (object, index, array) {
  this.push(array[index].author);
};

stats.keepUnique = function (elementValue, elementIndex, array){
  return array.indexOf(elementValue) === elementIndex;
};

stats.calculateUniqueAuthors = function () {
  var allAuthors = [];
  blog.articles.map(stats.pushToAllAuthorsArray, allAuthors);
  var uniqueAuthors = allAuthors.filter(stats.keepUnique);
  return uniqueAuthors;
};

stats.undoMarkdown = function (object, index, array) {
  var newBody = marked(array[index].markdown);
  array[index].body = $(newBody).text();

};

stats.replaceArticleBody = function () {
  (blog.articles).forEach(stats.undoMarkdown, blog.articles);

};

stats.calculateStatistics = function (data) {
  blog.articles = data;

  $('#totalArticles').text('Total number of articles = ' + blog.articles.length);

  $('#totalAuthors').text('Total unique authors = ' + (stats.calculateUniqueAuthors()).length);

  stats.replaceArticleBody();
  

};

stats.getData = function () {
  console.log ('testing get data');
  $.getJSON('data/hackerIpsum.json')

    .done(stats.calculateStatistics)

    .fail( function () {
      console.log('you suck maria');
    });


};

stats.getData();
