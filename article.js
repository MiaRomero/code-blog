/**
   * Creates new completed artile objects
   * @param dataObject - an ojbect from the blog.articles array
   */
function CompleteArticle(dataObject) {
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.author = dataObject.author;
  this.authorUrl = dataObject.authorUrl;
  this.publishedOn = dataObject.publishedOn;
  this.body = dataObject.body;
  this.milliDate = dataObject.milliDate;
}

/**
   * Calculates the number of days that have passed since "date"
   * @param date - date (in milliseconds) to be calculated
   */
CompleteArticle.prototype.calculateDaysAgo = function (date) {
  var milSecondsPerDay = 1000 * 3600 * 24;
  var today = new Date();
  return Math.floor((today-date) / milSecondsPerDay);
};

CompleteArticle.prototype.createDropDownFilter = function (filter, elementID){ ///filter must be this.property
  //var author = this.author;    ////elementID must include # and be a string
  var $options = $(elementID).children();
  var repeat = false;

  $options.each(function() {
                                                  ///console.log("THIS: " + $(this));
                                                  ///console.log('This is options.val: ' + $(this).val());
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
   * Clones the article element, formats the clone with the apporpriate info
   * from the oject that calls it, and inserts it into the DOM.
   */
CompleteArticle.prototype.toHTML = function () {
  var daysAgo = this.calculateDaysAgo(this.milliDate);
  var $newClone = $('article:last').clone();

  $newClone.find('.articleTitle').text(this.title);
  $newClone.find('.author').html('<a href= "' + this.authorUrl + '">By '+ this.author + '</a>');
  $newClone.find('.publishDate').text('Published ' + daysAgo + ' days ago on ' + this.publishedOn);
  $newClone.find('.articleContent').html(this.body);
  $newClone.find('.category').text(this.category).hide();
  $newClone.find('.readMore').text('Read More');
  $newClone.find('.readLess').text('Read Less');

  $('article:last').after($newClone);

  this.createDropDownFilter(this.author, '#authorDropDown');
  this.createDropDownFilter(this.category, '#categoryDropDown');
}
///////////////////////////////////////////
  /*var author = this.author;
  var $options = $('#authorDropDown').children();
  var repeat = false;

  $options.each(function() {
    if($options.val() == author ){
      repeat = true;
    }
  });

  if(!repeat){
    var $newOptionClone = $('#authorDropDown :first').clone();
    $newOptionClone.text(author);
    $('#authorDropDown :last').after($newOptionClone);
  }
};*/

///////////////////
