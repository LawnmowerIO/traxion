// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-audio'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $state.go('app.songs');
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.songs', {
      url: '/songs',
      views: {
        'menuContent': {
          templateUrl: 'templates/songs.html',
          controller: 'SongsCtrl'
        }
      }
    })

    .state('app.portfolio', {
      url: '/portfolio',
      views: {
        'menuContent': {
          templateUrl: 'templates/portfolio.html',
          controller: 'PortfolioCtrl'
        }
      }
    })


    .state('app.song', {
    url: '/song',
    views: {
      'menuContent': {
        templateUrl: 'templates/song.html',
        controller: 'SongCtrl'
      }
    }
  });
});
