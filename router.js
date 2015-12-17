page('/', articleController.index);

page('/about', repoController.index);

page('/category/:category', articleController.category);


page.start();
