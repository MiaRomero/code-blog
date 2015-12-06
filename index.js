
$(function () {
  blog.loadBlogPage();

  $('main').on('click', '.readMore',function(event){
    event.preventDefault();
    $(this).parent().find('div p').show();
    $(this).hide();
    $(this).parent().find('.readLess').show();
  });

  $('main').on('click', '.readLess',function(event){
    event.preventDefault();
    blog.truncateArticles();
  });

  $('header').on('click', '.tabLinks ul :nth-child(2)', function(event) {
    event.preventDefault();
    $('article').hide();
    $('#about p').show();
  });

  $('header').on('click', '.tabLinks ul :first-child', function(event) {
    event.preventDefault();
    $('article').show();
    $('#about p').hide();
  });

  $('#authorDropDown').change(function (){
    //console.log($(this).find(':selected').text());
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
