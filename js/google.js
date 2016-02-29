var map;
var markers = [];
var marker;
var infoWindow;
var bio = [
{
  'Name': 'BTS Udomsuk',
        'lat': '37.769',
        'lng': '-112.446'
    },{
        'Name': 'BTS Bdomsuk',
        'lat': '37.769',
        'lng': '-102.446'
    },{
        'Name': 'BTS Cdomsuk',
        'lat': '37.769',
        'lng': '-120.446'
    },{
        'Name': 'BTS Ddomsuk',
        'lat': '37.769',
        'lng': '-122.446'
    },{
        'Name': 'BTS Edomsuk',
        'lat': '37.769',
        'lng': '-120.446'
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
    title: loc.Name
  });

  loc.marker = marker;

  markers.push(marker);


        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: loc.Name
        });

        // On click open the infoWindow
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, loc.marker);
        });
        // On mouse over open the infoWindow
//        google.maps.event.addListener(markers, 'mouseover', function() {
//            infoWindow.open(map, markers);
//        });
        // On mouse out close the infoWindow
//        google.maps.event.addListener(markers, 'mouseout', function() {
//            infoWindow.close(map, markers);
//        });
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
      infoWindow.setContent(bio[i].Name);
      infoWindow.open(map, ref); 
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
//////
//////
//////


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
