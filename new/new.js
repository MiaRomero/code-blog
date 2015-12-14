var newEntry = {};

$('#entryForm').change(function() {
  newEntry.title = $('#articleTitle').val();
  newEntry.category = $('#category').val();
  newEntry.author = $('#author').val();
  newEntry.authorUrl = $('#authorUrl').val();
  newEntry.publishedOn = new Date();
  newEntry.body = marked($('#articleBody').val());

$.get('templates/article.handlebars', function(result) {

  var previewTemplateScript = $('#article-template').html();
  var previewTemplate = Handlebars.compile(previewTemplateScript);
  var previewHTML = previewTemplate(newEntry);

  $('#preview').empty().append(previewHTML);

  $('pre code').each(function (i, block){
    hljs.highlightBlock(block);
  });
  var newArticle = JSON.stringify(newEntry);
  $('#article-json').val(newArticle);
});
});
