
$(function () {
  blog.loadBlogPage();

  $('.readMore').on('click', function(event){
    event.preventDefault();
    $(this).parent().find('div p').show();
    $(this).hide();
    $(this).parent().find('.readLess').show();
  });

  $('.readLess').on('click', function(event){
    event.preventDefault();
    blog.truncateArticles();
  });

  $('#authorDropDown').change(function (){
    var selected = $('#authorDropDown').val();
    var chosenAuthor = 'By ' + selected;
    var filterByText = $('#authorDropDown option:first-child').text();
    $('#categoryDropDown').prop('selectedIndex',0);
    $('article').show();
    if (selected !== filterByText){
      $('.author').each(function() {
        if( $(this).text() !== chosenAuthor ) {
          $(this).parent().hide();
        };
      });
    }
  });

  $('#categoryDropDown').change(function () {
    var chosenCategory = ($('#categoryDropDown').val());
    var filterByText = $('#categoryDropDown option:first-child').text();
    $('#authorDropDown').prop('selectedIndex',0);;
    $('article').show();
    if (chosenCategory !== filterByText){
      $('.category').each(function() {
        if( $(this).text() !== chosenCategory ) {
          $(this).parent().hide();
        };
      });
    }
  });

});
