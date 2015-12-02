
$(function () {
  blog.loadBlogPage();

  truncateArticles = function () {
    $('div p:not(:first-child)').hide();
    $('.readMore').show();
    $('.readLess').hide();
  };

  truncateArticles();

  $('.readMore').on('click', function(event){
    event.preventDefault();
    console.log(event);
    $(this).parent().find('div p').show();
    $(this).hide();
    $(this).parent().find('.readLess').show();
  });

  $('.readLess').on('click', function(event){
    event.preventDefault();
    truncateArticles();
  });

  $('#authorDropDown').change(function (){
    var selected = $('#authorDropDown').val();
    var chosenAuthor = 'By ' + selected;
    var firstOption = $('#authorDropDown option:first-child').text();
    $('article').show();
    if (selected !== firstOption){
      $('.author').each(function() {
        if( $(this).text() !== chosenAuthor ) {
          $(this).parent().hide();
        };
      });
    }
  });

  $('#categoryDropDown').change(function () {
    var chosenCategory = ($('#categoryDropDown').val());
    var firstOption = $('#categoryDropDown option:first-child').text();
    $('article').show();
    if (chosenCategory !== firstOption){
      $('.category').each(function() {
        if( $(this).text() !== chosenCategory ) {
          $(this).parent().hide();
        };
      });
    }
  });

});
