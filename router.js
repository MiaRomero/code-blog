page('/', articleController.index);

page('/about', repoController.index);

page('/category/:category', articleController.category, articleController.show);


page.start();
