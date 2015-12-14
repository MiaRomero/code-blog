
var blog = {};
blog.articles = [];
blog.about = 'string';

blog.determineData = function () {

  $.getJSON('data/hackerIpsum.json')
    .done(function (result) {
      blog.articles = result;
      blog.populateDBTable();
      blog.loadBlogPage();
    })

  .fail( function () {
    console.log('get JSON FAIL');
  });
};

//callback function: renders markdown characters from article body
blog.undoMarkdown = function (object, index, array) {
  var newBody = marked(object.markdown);
  object.body = newBody;
};

//replaces article body with "un"markdowned version
blog.replaceArticleBody = function () {
  (blog.articles).forEach(blog.undoMarkdown);

};

//determines if blog should be viewed in admin mode
blog.determineAdminMode = function () {
  var testAdmin = window.location.search.substring(1);
  if (testAdmin === 'admin=true'){
    $('.articleTitle').after('<a class="editMode" href="edit_articles.html">EDIT</a>');
  }
};

//Converts each publishedOn date in article objects to milliseconds, adds that
//value to milliDate property for each object, sorts article array by publishedOn
//date, descending.

blog.sortArticlesByDate = function () {
  for (var i = 0; i < this.articles.length; i++){
    var date = this.articles[i].publishedOn;
    this.articles[i].milliDate = Date.parse(date);
  }
  this.articles.sort(function(a,b){
    return b.milliDate - a.milliDate;
  });
};

//Shows only the first paragraph of each article
blog.truncateArticles = function () {
  $('article .articleContent p').hide();
  $('article .articleContent p:first-of-type').show();
  $('article .articleContent h2').hide();
  $('article .articleContent h2:first-of-type').show();
  $('.category').hide();
  $('.readMore').show();
  $('.readLess').hide();
};

//Populates the drop down selectors. If the filter is not a repeat, clones
//the option element, formats the clone with the apporpriate info,
//and inserts it into the DOM.
//@param filter - the object property you want to filter by (object.property)
//@param elementID - the ID of the <select> element you want the filter to
//                   populate (must include be a string and include #)
blog.populateDropDownFilter = function (filter, elementID){
  var $options = $(elementID).children();
  var repeat = false;

  $options.each(function() {
    if($(this).val() === filter ){
      repeat = true;
    }
  });
  if(!repeat){
    var $newOptionClone = $(elementID +' :first').clone();
    $newOptionClone.text(filter);
    $(elementID + ' :last').after($newOptionClone);
  }
};

//Populates About tab.
blog.populateAboutTab = function () {
  $('#about p').text(this.about).hide();
};

//Creates article objects for each article in the data set. Populates dropdown
//filters based on the selected filter categories from article object properties.
//Truncates each article.
blog.createArticlesAndFilters = function (data) {
  for (var i = 0; i < blog.articles.length; i++){
    var fullArticle = new CompleteArticle(blog.articles[i]);
    fullArticle.toHTML(data);
    blog.populateDropDownFilter(fullArticle.author, '#authorDropDown');
    blog.populateDropDownFilter(fullArticle.category, '#categoryDropDown');
  };
};

//Populates articles and dropdown filters.
blog.populateArticleDivs = function() {
  $.get('templates/article.handlebars')

     .done(function (data) {
       blog.replaceArticleBody();
       blog.sortArticlesByDate();
       blog.createArticlesAndFilters(data);
       blog.truncateArticles();
       blog.determineAdminMode();
     })

           //check for new data?

    .fail(function errorMessage() {
      $('.articles').html('<p>Sorry, articles cannot be loaded.  Please refresh your browser.</p>');
    });
};

//Creates a completed article object from each object in article array,
//posts each to webpage.  Displays blog properly with tabs, drop downs, and
//truncated articles.
blog.loadBlogPage = function () {
  blog.populateArticleDivs();
  blog.populateAboutTab();
  // checkForNewArticles();
};

//make this a callback function with only the webDB call.  Do the forEach in another function.
blog.populateDBTable = function (){

  blog.articles.forEach(function(object){
    webDB.execute([
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [object.title, object.author, object.authorUrl, object.category, object.publishedOn, object.body],
      }
    ]);
  });
};
