var newEntry = {};
// var marked = require('marked');

$('#new-form').change(function() {
  newEntry.articleTitle = $('#article-title').val();
  newEntry.category = $('#article-category').val();
  newEntry.author = $('#article-author').val();
  newEntry.authorUrl = $('#article-author-url').val();
  newEntry.publishedOn = new Date();
  newEntry.articleBody = marked($('#article-body').val());

  var previewTemplateScript = $('#article-template').html();
  var previewTemplate = Handlebars.compile(previewTemplateScript);
  var previewHTML = previewTemplate(newEntry);

  $('#articles').empty().append(previewHTML);

  var newArticle = JSON.stringify(newEntry);
  $('#article-json').val(newArticle);

});
