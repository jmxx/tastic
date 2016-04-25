/* global page */
  'use strict';

var $ = require('jquery');

page('/', function () {
  alert('index');
});

page('/page/:page', function (ctx) {
  $('#content').load('/pages/' + ctx.params.page + '.jade.html');
});

$(document).on('ready', function () {
  page({
    hashbang: true
  });

  console.log('Hey you wanna some magic!');
});
