var stats = {};


// stats.keepUnique = function (elementValue, elementIndex, array){
//   return array.indexOf(elementValue) === elementIndex;
// };

stats.calculateUniqueAuthors = function () {
  var uniqueAuthors = [];
  console.log('testing artilce index 1: ' + blog.articles[1].author);

  blog.articles.map(function (object, index, array){

    console.log('author: ' + array[index].author);
  });

};




stats.calculateStatistics = function (data) {
  blog.articles = data;

  $('#totalArticles').text('Total number of articles = ' + blog.articles.length);

  stats.calculateUniqueAuthors();




};

stats.getData = function () {
  console.log ('test1');
  $.getJSON('data/hackerIpsum.json')

    .done(stats.calculateStatistics)

    .fail( function () {
      console.log('you suck maria');
    });


};

stats.getData();
