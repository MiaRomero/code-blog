
//Populates About tab.
// blog.populateAboutTab = function () {
//   $('#about p').text(this.about).hide();
// };

var repos = {};
repos.all = [];

repos.RequestAll = function (callback){

  $.ajax({
    type:'GET',
    url: 'https://api.github.com/users/MiaRomero/repos',
    headers: { Authorization: 'token ' + githubToken }

  }).done(function(data){
    console.log(data);
    repos.all = data;
  }).done(callback);
};

repos.contributions = function (callback){
  $.ajax({
    type:'GET',
    url: 'https://api.github.com/repos/MiaRomero/code-blog/branches',
    headers: { Authorization: 'token ' + githubToken }

  }).done(function(data){
    console.log(data);

  }).done(callback);
};

var about = {};
about.blurb = 'string of some sort';

about.index = function () {
  $('.articles').hide();
  $('.about').empty().show();
  $('#repos').empty().show();
  $('.about').prepend('<p>' + about.blurb + '</p>');
  $('.about p').append('<p>Here are my GitHub repos: </p>');
  repos.all.forEach(function (currentElement, index, array){
    $('#repos').append($('<li>').text(array[index].full_name));
  });
  repos.contributions();
};
