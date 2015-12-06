var newEntry = {};

$('#entryForm').change(function() {
  newEntry.articleTitle = $('#articleTitle').val();
  newEntry.category = $('#category').val();
  newEntry.author = $('#author').val();
  newEntry.authorUrl = $('#authorUrl').val();
  newEntry.publishedOn = new Date();
  newEntry.articleBody = marked($('#articleBody').val());

  var previewTemplateScript = $('#article-template').html();
  var previewTemplate = Handlebars.compile(previewTemplateScript);
  var previewHTML = previewTemplate(newEntry);

  $('#preview').empty().append(previewHTML);
  $('pre code').each(function (i, block){
    hljs.highlightBlock(block);
  });

  var newArticle = JSON.stringify(newEntry);
  $('#jsonString').val(newArticle);

});
