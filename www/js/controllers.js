angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('SongsCtrl', function($scope, SongService, $state) {
  $scope.songs = SongService.songs;

  $scope.gotoSong = function(id){
    SongService.songId = id;
    $state.go('app.song');
  };
})

.controller('SongCtrl', function($scope, $stateParams, SongService, $timeout) {

  for (var i = 0; i < SongService.songs.length; i++){
    console.log(SongService.songId);
    console.log(SongService.songs[i].id);
    if (SongService.songs[i].id == SongService.songId){
      $scope.track = SongService.songs[i];
      $timeout(function(){
        $scope.togglePlayback = true;
      }, 300);
      break;
    }
  }

})

.service('SongService', function(){
  var self = this;
  this.songs = [
    { title: 'Rollout', artist: 'Ludacris', url: 'music/1.mp3', art: 'img/1.png' },
    { title: 'Cowbell', artist: 'Young Thug', id: 2 }
  ];

  this.songId = 1;
});
