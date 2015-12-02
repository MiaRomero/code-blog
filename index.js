
$(function () {
  blog.loadBlogPage();

  truncateArticles = function () {
    $('div p:not(:first-child)').hide();
    $('.readMore').show();
    $('.readLess').hide();
  };

  truncateArticles();

///
  $('.readMore').on('click', function(event){
    event.preventDefault();
    console.log(event);
    $(this).parent().find('div p').show();
    $(this).hide();
    $(this).parent().find('.readLess').show();
  });
///
  $('.readLess').on('click', function(event){
    event.preventDefault();
    truncateArticles();
  });
///
  $('#authorDropDown').change(function (){
    var chosenAuthor = $('#authorDropDown').val();

    $('article').each(function() {
      if($(this).find('.author') !== chosenAuthor){
        $(this).hide();
      }
    });

    console.log(chosenAuthor);
    $('article').find('category');

  });





///
  $('#categoryDropDown').change(function () {
    console.log($('#categoryDropDown').val());
  });






});
