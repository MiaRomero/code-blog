
  webDB.reconnect();

  var editor = {};
  var chosenID = 0;

  editor.getArticleID = function (){
    //var chosenID = window.location.search.substring(4);
    chosenID = 12;
    return chosenID;
  };

  editor.displayPreview = function (resultObject){
    var entry = {};
    entry.title = resultObject[0].title;
    entry.author = resultObject[0].author;
    entry.authorUrl = resultObject[0].authorUrl;
    entry.category = resultObject[0].category;
    entry.body = marked(resultObject[0].body);
    entry.publishedOn = resultObject[0].publishedOn;

    $.get('templates/article.handlebars', function(result) {
      var previewTemplateScript = $('#article-template').html();
      var previewTemplate = Handlebars.compile(previewTemplateScript);
      var previewHTML = previewTemplate(entry);

      $('#preview').empty().append(previewHTML);

      $('pre code').each(function (i, block){
        hljs.highlightBlock(block);
      });
    });
  };

  editor.displayChosenArticle = function () {
    webDB.execute(
      'SELECT * FROM articles WHERE id=' + editor.getArticleID() + ';',
      function(results){
        $('#articleTitle').val(results[0].title);
        $('#author').val(results[0].author);
        $('#authorUrl').val(results[0].authorUrl);
        $('#category').val(results[0].category);
        $('#articleBody').text(results[0].body);

        editor.displayPreview(results);
        var newArticle = JSON.stringify(newEntry);
        $('#article-json').val(newArticle);
      });
  };

  $(function () {
    editor.getArticleID();
    editor.displayChosenArticle();
  });
