var articleController = {};

articleController.index = function () {
  blog.determineData();
};

articleController.category = function (ctx, next) {
  console.log('in articleController.category function');
  console.log('ctx:  ' + ctx);
  console.log('next:  ' + next);
  var categoryData = function (data) {
    console.log('data: ' + data);
    ctx.articles = data;
    console.log('ctx.articles:  ' + ctx.articles);
    next();
  };
  CompleteArticle.findByCategory(ctx.params.category, categoryData);
};
