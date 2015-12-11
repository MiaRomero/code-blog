
var editor = {};

editor.testDatabase = function () {
  webDB.execute(
    'SELECT author FROM articles WHERE id IN (4, 5, 6);',
    function(results){
      console.log(results);
      console.log('test');

      $('#author').text('<p>' + results[0].author + '</p>');
    });
};

editor.testDatabase();
console.log('this file executes');
