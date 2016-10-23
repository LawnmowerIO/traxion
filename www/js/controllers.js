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

  $scope.numPlays = SongService.getTotalPlays();
  $scope.equity = SongService.getEquity();
  $scope.equityPercent = $scope.equity.start;

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

  var incrementEquity = function(){
    $scope.equityPercent += $scope.equity.interval;
    $timeout(incrementEquity, 1000);
  };

  incrementEquity();


  //var incrementPlayCount = function(){
  //  $scope.numPlays++;
  //  var nextRun = Math.floor(Math.random() * 4000) + 100;
  //  $timeout(incrementPlayCount, nextRun);
  //};
  //
  //incrementPlayCount();


})

  .controller('PortfolioCtrl', function($scope, $stateParams, SongService, $timeout) {


  })


  .service('SongService', function(){
  var self = this;

    this.songs = [
      { title: 'Pursuit of Happiness', artist: 'Kid Cudi', id: 1 },
      { title: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', id: 2 },
      { title: 'Pipe It Up', artist: 'Migos', id: 3 },
      { title: 'Black Beatles', artist: 'Rae Sremmurd', id: 4 },
      { title: 'Check', artist: 'Young Thug', id: 5 },
      { title: 'Lifestyle', artist: 'Rich Gang', id: 6 },
      { title: 'Dreams and Nightmares (Intro)', artist: 'Meek Mill', id: 7 },
      { title: 'I’m Different', artist: '2 Chainz', id: 8 },
      { title: 'Faded', artist: 'Tyga', id: 9 },
      { title: 'All Gold Everything', artist: 'Trinidad James', id: 10 },
      { title: 'Slaughterhouse', artist: 'Montana of 300', id: 11 },
      { title: 'Out The Mud', artist: 'Kevin Gates', id: 12 },
      { title: 'Drop The World', artist: 'Lil Wayne', id: 13 },
      { title: 'My Life', artist: 'The Game', id: 14 },
      { title: 'Started From The Bottom', artist: 'Drake', id: 15 }
    ];

    for (var i = 0; i < this.songs.length; i++){
      this.songs[i].url = 'music/' + this.songs[i].id + '.mp3';
      this.songs[i].art = 'img/' + this.songs[i].id + '.png';
    }

    this.showBigSong = true;

    this.getTotalPlays = function(){
      if (this.showBigSong){
        return Math.floor(Math.random() * 500000) + 600000;
      } else {
        return Math.floor(Math.random() * 500) + 100;
      }
    };

    this.getEquity = function(){
      if (this.showBigSong){
        return {
          start:.06,
          end:.09,
          interval:.001
        }
      } else {
        return {
          start:.1,
          end:.3,
          interval:.01
        }

      }
    };

    this.songId = 1;
});
