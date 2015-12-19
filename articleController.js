var articleController = {};

articleController.index = function () {
  blog.determineData();
};

articleController.category = function (ctx, next) {
  var categoryData = function (data) { //rename data to articles?  it is the return of .findByCategory
    ctx.articles = data;
    next();
  };
  CompleteArticle.findByCategory(ctx.params.category, categoryData);
};

articleController.show = function(ctx, next) {
  console.log('we\'re now in articleController.show');
  console.log(ctx.articles);
};
