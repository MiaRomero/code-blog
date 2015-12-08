
var blog = {};
blog.articles = rawData;
blog.about = about;

blog.determineData = function () {
  //get storedEtag
  //get currentEtag

  // if(currentEtag === storedEtag){
  //   //use cached JSON, set blog properties to this
  // }

  //else {
    //get data from server, set blog properties to this
    $.get('data/blogData.js')

      .done(function (result) {
        console.log('THIS IS RESULT:  ' + typeof(result));
        result = JSON.parse(eval(result));
        console.log('RESULT PARSED' + result);
        blog.articles = result;
        //console.log('THIS IS BLOG.ARTICLES  ' + blog.articles);
        console.log('testing');

      });
  //}


};

/**
   * Converts each publishedOn date in article objects to milliseconds, adds that
   * value to milliDate property for each object, sorts article array by publishedOn
   * date, descending.
   */
blog.sortArticlesByDate = function () {
  for (var i = 0; i < this.articles.length; i++){
    var date = this.articles[i].publishedOn;
    this.articles[i].milliDate = Date.parse(date);
  }
  this.articles.sort(function(a,b){
    return b.milliDate - a.milliDate;
  });
};

/**
   * Shows only the first paragraph of each article
   */
blog.truncateArticles = function () {
  $('.articleContent p:not(:first-child)').hide();
  $('.category').hide();
  $('.readMore').show();
  $('.readLess').hide();
};

/**
   * Populates the drop down selectors. If the filter is not a repeat, clones
   * the option element, formats the clone with the apporpriate info,
   * and inserts it into the DOM.
   * @param filter - the object property you want to filter by (object.property)
   * @param elementID - the ID of the <select> element you want the filter to
   *                    populate (must include be a string and include #)
   */
blog.createDropDownFilter = function (filter, elementID){
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

/**
   * Populates About tab.
   */
blog.populateAboutTab = function () {
  $('#about p').text(this.about).hide();
};

/**
   * Creates article objects for each article in the data set. Populates dropdown
   * filters based on the selected filter categories from article object properties.
   * Truncates each article.
   */
blog.createArticles = function (data) {
  for (var i = 0; i < blog.articles.length; i++){
    var fullArticle = new CompleteArticle(blog.articles[i]);
    fullArticle.toHTML(data);
    blog.createDropDownFilter(fullArticle.author, '#authorDropDown');
    blog.createDropDownFilter(fullArticle.category, '#categoryDropDown');
  };
  blog.truncateArticles();
};

/**
   * Populates articles and dropdown filters.
   */
blog.populateArticleDiv = function() {
  $.get('templates/article.handlebars')

     .done(blog.createArticles)
           //check for new data?

    .fail(function errorMessage() {
      $('.articles').html('<p>Sorry, articles cannot be loaded.  Please refresh your browser.</p>');
    });
};

/**
   * Creates a completed article object from each object in article array,
   * posts each to webpage.  Displays blog properly with tabs, drop downs, and
   * truncated articles.
   */
blog.loadBlogPage = function () {
  blog.sortArticlesByDate();
  //blog.determineData();
  blog.populateArticleDiv();
  blog.populateAboutTab();
  // checkForNewArticles();
};
