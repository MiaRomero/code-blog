var articleController = {};

articleController.index = function () {
  webDB.init();
  blog.determineData(); 
};
