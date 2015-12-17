var repos = {};
repos.all = [];
repos.branches = [];

repos.RequestAll = function (callback){

  $.ajax({
    type:'GET',
    url: '/github/users/MiaRomero/repos',
  }).done(function(data){
    console.log(data);
    repos.all = data;
  }).done(callback);
};

repos.branches = function (callback){
  $.ajax({
    type:'GET',
    url: '/github/repos/MiaRomero/code-blog/branches',
  
  }).done(function(data){
    repos.branches = data;
    repos.branches.forEach(function (currentElement, index, array){
      $('#branches').append($('<li>').text(array[index].name));
    });
  }).done(callback);
};

var about = {};
about.blurb = 'About me me me.  I\'m in Code 301.  This is my project.';

about.index = function () {
  $('.articles').hide();
  $('.about').empty().show();
  $('#repos').empty().show();
  $('.about').prepend('<p>' + about.blurb + '</p>');
  $('.about p').append('<p>Here are my GitHub repos: </p>');
  repos.all.forEach(function (currentElement, index, array){
    $('#repos').append($('<li>').text(array[index].full_name));
  });
  $('#branches').text('And here are the branches on my current project repo: ');
  repos.branches();
};
