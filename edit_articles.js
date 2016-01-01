
  webDB.reconnect();

  var editor = {};
  var chosenID = 0;

  //Gets article ID from url
  editor.getArticleID = function (){
    chosenID = window.location.search.substring(4);
    return chosenID;
  };

  //Displays article retrieved from database
  editor.displayPreview = function (resultObject){
    var entry = {};
    entry.title = resultObject[0].title;
    entry.author = resultObject[0].author;
    entry.authorUrl = resultObject[0].authorUrl;
    entry.category = resultObject[0].category;
    entry.body = marked(resultObject[0].markdown);
    entry.publishedOn = resultObject[0].publishedOn;

    $.get('templates/article.handlebars', function(result) {
      var previewTemplateScript = $('#article-template').html();
      var previewTemplate = Handlebars.compile(previewTemplateScript);
      var previewHTML = previewTemplate(entry);

      $('#preview').empty().append(previewHTML);

      $('pre code').each(function (i, block){
        hljs.highlightBlock(block);
      });
      var newArticle = JSON.stringify(entry);
      $('#jsonString').val(newArticle);
    });
  };

  //Gets article from database based on article ID in url
  editor.displayChosenArticle = function () {
    webDB.execute(
      'SELECT title, author, authorUrl, category, publishedOn, markdown FROM articles WHERE id=' + editor.getArticleID() + ';',
      function(results){
        $('#articleTitle').val(results[0].title);
        $('#author').val(results[0].author);
        $('#authorUrl').val(results[0].authorUrl);
        $('#category').val(results[0].category);
        $('#articleBody').html(results[0].markdown);
        editor.displayPreview(results);
      });
  };

  $(function () {
    editor.getArticleID();
    editor.displayChosenArticle();

    //Updates preview article when any entry field is changed
    $('#entryForm').on('change', function(event){
      var editedEntry = {};
      editedEntry.title = $('#articleTitle').val();
      editedEntry.category = $('#category').val();
      editedEntry.author = $('#author').val();
      editedEntry.authorUrl = $('#authorUrl').val();
      editedEntry.publishedOn = $('#publishedOn').val();
      editedEntry.body = marked($('#articleBody').val());

      var previewTemplateScript = $('#article-template').html();
      var previewTemplate = Handlebars.compile(previewTemplateScript);
      var previewHTML = previewTemplate(editedEntry);

      $('#preview').empty().append(previewHTML);
      $('pre code').each(function (i, block){
        hljs.highlightBlock(block);
      });
    });

    //Deletes article from database
    $('#deleteArticle').on('click', function(event){
      event.preventDefault();
      webDB.execute(
        'DELETE FROM articles WHERE id=' + chosenID + ';',
        function(results){
          $('#DBMessage').text('Article has been deleted from blog database.');
        });
    });

    //Updates article in database
    $('#updateArticle').on('click', function(event){
      event.preventDefault();
      webDB.execute(
        'UPDATE articles SET title="' + $('#articleTitle').val() + '", author="' + $('#author').val() + '", authorUrl="' + $('#authorUrl').val() + '", category="' + $('#category').val() + '", markdown="' + $('#articleBody').val() + '" WHERE id=' + chosenID + ';',
        function(results){
          $('#DBMessage').text('Article has been updatated in blog database.');
        });
    });
  });
