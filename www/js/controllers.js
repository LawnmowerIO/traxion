angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, SongService) {
  $scope.balance = SongService.balance;
  $scope.showNavbar = true;
  //$scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
  //  $scope.showNavbar = true;
  //});
  //
  //$scope.$on( "$ionicView.beforeLeave", function( scopes, states ) {
  //  $scope.showNavbar = false;
  //});
})

.controller('SongsCtrl', function($scope, SongService, $state) {
  $scope.songs = SongService.songs;

  $scope.coverflows = [
    {id: 16},
    {id: 17},
    {id: 18},
    {id: 19},
    {id: 20},
    {id: 21},
    {id: 22},
    {id: 23},
    {id: 24}
  ];

  $scope.gotoSong = function(id){
    SongService.songId = id;
    SongService.showBigSong = !SongService.showBigSong;
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
    if ($scope.equityPercent >= $scope.equity.end){
      return;
    }
    $timeout(incrementEquity, 50);
  };

  incrementEquity();

})

  .controller('PortfolioCtrl', function($scope, $stateParams, SongService, $timeout, $ionicLoading, $http) {
    $scope.disabled = false;


    $scope.chartOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : false,

      //String - The colour of each segment stroke
      segmentStrokeColor : "#1a1a1a",

      //Number - The width of each segment stroke
      segmentStrokeWidth : 0,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 0, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect
      animationEasing : "easeOutBounce",

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,
      maintainAspectRatio: false,

    };

    // Number - Number of animation steps
    Chart.defaults.global.animationSteps = 60;

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    Chart.defaults.global.animationEasing = "easeInOutQuint";

    // Boolean - If we should show the scale at all
    Chart.defaults.global.showScale = false;

    // Boolean - If we want to override with a hard coded scale
    Chart.defaults.global.scaleOverride = false;

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    Chart.defaults.global.scaleSteps = null;
    // Number - The value jump in the hard coded scale
    Chart.defaults.global.scaleStepWidth = null;
    // Number - The scale starting value
    Chart.defaults.global.scaleStartValue = null;

    // String - Colour of the scale line
    Chart.defaults.global.scaleLineColor = "rgba(0,0,0,.1)";

    // Number - Pixel width of the scale line
    Chart.defaults.global.scaleLineWidth = 1;

    // Boolean - Whether to show labels on the scale
    Chart.defaults.global.scaleShowLabels = true;

    // Interpolated JS string - can access value
    Chart.defaults.global.scaleLabel = "<%=value%>";

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    Chart.defaults.global.scaleIntegersOnly = true;

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    Chart.defaults.global.scaleBeginAtZero = false;

    // String - Scale label font declaration for the scale label
    Chart.defaults.global.scaleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    // Number - Scale label font size in pixels
    Chart.defaults.global.scaleFontSize = 12;

    // String - Scale label font weight style
    Chart.defaults.global.scaleFontStyle = "normal";

    // String - Scale label font colour
    Chart.defaults.global.scaleFontColor = "#747080";

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    Chart.defaults.global.responsive = false;

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    Chart.defaults.global.maintainAspectRatio = false;

    // Boolean - Determines whether to draw tooltips on the canvas or not
    Chart.defaults.global.showTooltips = true;

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    Chart.defaults.global.customTooltips = false;

    // Array - Array of string names to attach tooltip events
    Chart.defaults.global.tooltipEvents = ["touchstart", "touchmove"];

    // String - Tooltip background colour
    Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,0.8)";

    // String - Tooltip label font declaration for the scale label
    Chart.defaults.global.tooltipFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    // Number - Tooltip label font size in pixels
    Chart.defaults.global.tooltipFontSize = 14;

    // String - Tooltip font weight style
    Chart.defaults.global.tooltipFontStyle = "normal";

    // String - Tooltip label font colour
    Chart.defaults.global.tooltipFontColor = "#fff";

    // String - Tooltip title font declaration for the scale label
    Chart.defaults.global.tooltipTitleFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

    // Number - Tooltip title font size in pixels
    Chart.defaults.global.tooltipTitleFontSize = 8;

    // String - Tooltip title font weight style
    Chart.defaults.global.tooltipTitleFontStyle = "bold";

    // String - Tooltip title font colour
    Chart.defaults.global.tooltipTitleFontColor = "#fff";

    // Number - pixel width of padding around tooltip text
    Chart.defaults.global.tooltipYPadding = 6;

    // Number - pixel width of padding around tooltip text
    Chart.defaults.global.tooltipXPadding = 6;

    // Number - Size of the caret on the tooltip
    Chart.defaults.global.tooltipCaretSize = 8;

    // Number - Pixel radius of the tooltip border
    Chart.defaults.global.tooltipCornerRadius = 0;

    // Number - Pixel offset from point x to tooltip edge
    Chart.defaults.global.tooltipXOffset = 0;

    // String - Template string for single tooltips
    //tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
    Chart.defaults.global.tooltipTemplate = "<%= label %>: <%= value %>%";

    // String - Template string for multiple tooltips
    Chart.defaults.global.multiTooltipTemplate = "<%= value %>";

    // Function - Will fire on animation progression.
    Chart.defaults.global.onAnimationProgress = function () {
    };

    // Function - Will fire on animation completion.
    Chart.defaults.global.onAnimationComplete = function () {
    };



    $scope.portfolio = {
      songs: [
      {
        value: 42,
        color:"#21d663",
        highlight: "#21d663",
        label: "Hip-Hop"
      },
      {
        value: 28,
        color: "#08BD4A",
        highlight: "#08BD4A",
        label: "Electronic"
      },
      {
        value: 17,
        color: "#00A330",
        highlight: "#00A330",
        label: "Rock"
      },
        {
          value: 13,
          color: "#008A17",
          highlight: "#008A17",
          label: "Country"
        }

    ]
    };



    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Pie($scope.portfolio.songs, $scope.chartOptions);

    $scope.paid = 23.43;
    $scope.revenue = 5.12;
    $scope.return_percent = 24.3;
    $scope.plays = '11,012';
    $scope.balance = SongService.balance;

    $scope.cashOut = function(){
      $scope.disabled=true;



      $ionicLoading.show({
        noBackdrop: true,
        //template: '<i class="icon ion-loading-c" style="color:white; font-size: 2em"></i>',
      });

      var request = $http.get('https://glacial-river-50718.herokuapp.com/transfer_funds');
      request.success(function (data, status, headers, config) {
        console.log("INFO", "OK");
      }).error(function (data, status, headers, config) {
        console.log("ERROR", "statsServices", "getTable", data);
      });

      $timeout(function(){
        SongService.balance = 0;
        $scope.balance = SongService.balance;
        $scope.$parent.balance = SongService.balance;

        $ionicLoading.hide();
        $scope.disabled = false;
      }, 1000);


    };


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

    this.showBigSong = false;

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
          start:.062,
          end:.091,
          interval:.001
        }
      } else {
        return {
          start:.11,
          end:.32,
          interval:.001
        }

      }
    };

    this.songId = 1;

    this.balance = 10.23;
});
