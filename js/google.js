var map;
var markers = [];
var marker;
var infoWindow;
var bio = [
{
  'Name': 'BTS kokokok',
        'lat': '37.769',
        'lng': '-112.446',
        'description':'description A'
    },{
        'Name': 'BTS',
        'lat': '37.769',
        'lng': '-102.446',
        'description':'description B'
    },{
        'Name': 'MRT',
        'lat': '37.769',
        'lng': '-120.446',
        'description':'description C'
    },{
        'Name': 'BTS',
        'lat': '37.769',
        'lng': '-122.446',
        'description':'description D'
    },{
        'Name': 'JR',
        'lat': '37.769',
        'lng': '-120.446',
        'description':'description D'
    }];
    /*
var locations = [];
var bioLength = bio.length;
for(var i=0; i < bioLength; i++) {
  locations.push(bio[i]);

//  Addmarker(bio[i]);
}*/
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.


function initMap() {
  var haightAshbury = {lat: 37.769, lng: -122.446};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var bioLength = bio.length;
  for(var i=0; i < bioLength; i++) {
    var data = bio[i];
  addMarker(data);
}
ko.applyBindings(new ViewModel());
}

// Adds a marker to the map and push to the array.
function addMarker(loc) {
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(loc.lat, loc.lng),
    map: map,
    title: loc.Name,
    draggable: true,
    animation: google.maps.Animation.DROP
  });

  loc.marker = marker;

  markers.push(marker);


        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: loc.Name + '<br>'+ '<br>' + loc.description
        });

        // On click open the infoWindow
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, loc.marker);
            toggleBounce();
            test();
        });

            function test(){
              var cityStr = [];
              cityStr.push(loc.Name);
              console.log(cityStr);
              loadData(cityStr);

            }
function toggleBounce() {
  if (loc.marker.getAnimation() !== null) {
    loc.marker.setAnimation(null);
  } else {
    loc.marker.setAnimation(google.maps.Animation.BOUNCE);
  }}

}

var ViewModel = function() {

    var self = this;

    //popped up massages after clicking
    self.Locates = function(box1){
  var ref;
  for (var i = 0; i <bio.length ; i++) {
    if(bio[i].Name == box1.Name) {
      ref = markers[i];
      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent(bio[i].Name + '<br>' + '<br>' + bio[i].description);
      infoWindow.open(map, ref);
      loadData(bio[i].Name);
      box1.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
};

    self.query = ko.observable('');
    
    self.search= ko.computed(function(){
        return ko.utils.arrayFilter(bio, function(point){
            if(point.Name.toLowerCase().indexOf(self.query().toLowerCase())>=0){
              point.marker.setVisible(true);
              console.log(point);

                return true;
            }
            point.marker.setVisible(false);
            return false;
        });
    });
};
//Wikipedia API
function loadData(str) {
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $greeting = $('#greeting');
    // clear out old data before new request
    $wikiElem.text("");

var cityStr = str;
console.log(cityStr);//Does this work on correctly?

    // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    console.log('loaded');
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
        }
    });
    return false;
};

$('#form-container').submit(loadData);


/*

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
*/
      /*
       * Open the drawer when the menu ison is clicked.
       */
      var menu = document.querySelector('#menu');
      var main = document.querySelector('main');
      var drawer = document.querySelector('#drawer');

      menu.addEventListener('click', function(e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
      });
      main.addEventListener('click', function() {
        drawer.classList.remove('open');
      });
