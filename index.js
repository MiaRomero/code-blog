
$(function () {
  webDB.init();
  blog.determineData();
  blog.loadBlogPage();


  $('main').on('click', '.readMore',function(event){
    event.preventDefault();
    $(this).parent(':first-child').show();
    $(this).hide();
    $(this).parent().find('.readLess').show();
  });

  $('main').on('click', '.readLess',function(event){
    event.preventDefault();
    blog.truncateArticles();
  });

  $('header').on('click', '.tabLinks :nth-child(2)', function(event) {
    event.preventDefault();
    $('article').hide();
    $('#about p').show();
  });

  $('header').on('click', '.tabLinks :first-child', function(event) {
    event.preventDefault();
    $('article').show();
    $('#about p').hide();
  });

  $('#authorDropDown').change(function (){
    var selected = $(this).find(':selected').text();
    $('article').hide();
    $('article div.author:contains(' + selected + ')').parent().show();
    if(($('#authorDropDown option:first-child').is(':selected'))){
      $('article').show();
    };
    $('#categoryDropDown').prop('selectedIndex',0);
  });

  $('#categoryDropDown').change(function () {
    var selected = $(this).find(':selected').text();
    $('article').hide();
    $('article div.category:contains(' + selected + ')').parent().show();
    if(($('#categoryDropDown option:first-child').is(':selected'))){
      $('article').show();
    };
    $('#authorDropDown').prop('selectedIndex',0);;
  });

//   click on edit button:
//
//   $("a").click(function(e) {
//     e.preventDefault();
//     window.location.href = $(this).attr("href") + '?Hello=True';
// }

  $('main').on('click', '.editMode', function(event){
    event.preventDefault();
    $(this).attr("href") + "string";

});

});
