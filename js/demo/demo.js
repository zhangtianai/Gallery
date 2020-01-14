/*
 * blueimp Gallery Demo JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global blueimp, $ */

$(function() {
  'use strict'

  // Load demo images from flickr:
  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    data: {
      format: 'json',
      method: 'flickr.interestingness.getList',
      // eslint-disable-next-line camelcase
      api_key: '7617adae70159d09ba78cfec73c13be3'
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function(result) {
    var carouselLinks = []
    var linksContainer = $('#links')
    var baseUrl
    // Add the demo images as links with thumbnails to the page:
    $.each(result.photos.photo, function(index, photo) {
      baseUrl =
        'https://farm' +
        photo.farm +
        '.static.flickr.com/' +
        photo.server +
        '/' +
        photo.id +
        '_' +
        photo.secret
      $('<a/>')
        .append($('<img>').prop('src', baseUrl + '_s.jpg'))
        .prop('href', baseUrl + '_b.jpg')
        .prop('title', photo.title)
        .attr('data-gallery', '')
        .appendTo(linksContainer)
      carouselLinks.push({
        href: baseUrl + '_c.jpg',
        title: photo.title
      })
    })
    // Initialize the Gallery as image carousel:
    // eslint-disable-next-line new-cap
    blueimp.Gallery(carouselLinks, {
      container: '#blueimp-image-carousel',
      carousel: true
    })
  })

  var arraydata;
  $.ajax({
    url: "http://13.56.207.99:8080/v1/cloud/geturldata",
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    success: function (result) {
    var result = JSON.stringify(result);
    arraydata = eval("("+result+")");
    console.log(arraydata.data);
 }
 });
 
  // Initialize the Gallery as video carousel:
  // eslint-disable-next-line new-cap
  blueimp.Gallery(arraydata.data,
    {
      container: '#blueimp-video-carousel',
      carousel: true
    }
  )
})
