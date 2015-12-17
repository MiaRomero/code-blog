var articleController = {};

articleController.index = function () {
  blog.determineData();
};

articleController.category = function (ctx, next) {
  var categoryData = function (data) {
    ctx.articles = data;
    next();
  };
  CompleteArticle.findByCategory(ctx.params.category, categoryData);
};

articleController.show = function(ctx, next) {
  console.log('we\'re now in articleController.show');
  console.log(ctx.articles);
};
