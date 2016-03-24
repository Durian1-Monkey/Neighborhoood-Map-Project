var map,
    markers = [],
    marker,
    iconBase,
    infoWindow,
    bounds,
    locations = [{
        'Name': 'Terminal 21',
        'lat': '13.737920',
        'lng': '100.560416',
        'description': 'You can buy whatever you want here. </br>I often come here to buy books and small presents for my pals and family members. </br>This shopping mall is easy to access from BTS Asok.Termial 21 is for shopping and cheap items and cloths and suveniors. The products are a bit pricy for foreigners to be compared with local products. My fried bought my present here.'
    }, {
        'Name': 'Wat Arun',
        'lat': '13.743719',
        'lng': '100.489876',
        'description': 'Entrance fee 50 BTH. </br>We should visit here in the early morning.'
    }, {
        'Name': 'Lumphini Park',
        'lat': '13.730026',
        'lng': '100.541199',
        'description': 'One of the biggest park in Bangkok. </br>People enjoy playing out here. </br>I love to sing and dance with my favorite musics.'
    }, {
        'Name': 'Chatuchak Weekend Market',
        'lat': '13.799994',
        'lng': '100.550568',
        'description': 'This is the big market in Bangkok. </br>You can find many interesting things which might be expensive if you bought at shopping malls'
    }, {
        'Name': 'Wat Pho',
        'lat': '13.746919',
        'lng': '100.492738',
        'description': 'My Thai friend invited me to go sightseeing here. </br>Inside the temple, the big guy is laying down to relax!! </br>And many people visit here to look at him every day.'
    }, {
        'Name': 'Wat Suthat',
        'lat': '13.752400',
        'lng': '100.501120',
        'description': 'This is a royal temple of the first grade. </br>I have never been to here yet.'
    }, {
        'Name': 'Chao Phraya River',
        'lat': '13.726736',
        'lng': '100.512698',
        'description': 'This is the first grade river in Thai. </br>You can enjoy a boat cruise tour.'
    }];

// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.

function initMap() {
    var haightAshbury = {
        lat: 13.747174,
        lng: 100.534907
    };


    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: haightAshbury,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.RIGHT_TOP
        }
    });

    var locationsLength = locations.length;
    for (var i = 0; i < locationsLength; i++) {
        var data = locations[i];
        addMarker(data);
    }
    ko.applyBindings(new ViewModel());

    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow();
}

// Adds a marker to the map and push to the array.
function addMarker(loc) {
    iconBase = 'icon.png';
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(loc.lat, loc.lng),
        map: map,
        title: loc.Name,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: iconBase
    });

    loc.marker = marker;

    markers.push(marker);

    // On click open the infoWindow
    google.maps.event.addListener(marker, 'click', function() {

        infoWindow.setContent(loc.Name + '<br>' + '<br>' + loc.description + '<br>' + '<br>' + '<div id ="content">' + '</div>');
        toggleBounce();
        loadData(loc.Name);
        infoWindow.open(map, loc.marker);
        map.panTo(marker.getPosition());
    });

    function toggleBounce() {
        if (loc.marker.getAnimation() !== null) {
            loc.marker.setAnimation(null);
        } else {
            loc.marker.setAnimation(google.maps.Animation.BOUNCE);
            console.log("bound?");
            setTimeout(loc.marker.setAnimation(null), 700);
        }
    }

    //Wikipedia API
    function loadData(str) {
        // load wikipedia data
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + str + '&format=json&callback=wikiCallback';
        console.log(wikiUrl);

        // load wikipedia data
        var wikiRequestTimeout = setTimeout(function() {
            var finder = document.getElementById("content"); //Find the infoWindow.setContent
            finder.innerHTML = "Failed to get wikipedia resources"; //Inside the infoWindow, add error varliable
        }, 8000);

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            jsonp: "callback",
            success: function(response) {
                var articleList = response[1];
                for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    var maker = '<li><a href="' + wikiUrl + '">' + articleStr + '</a></li>'; //Make wikipedia link                    
                    localStorage.setItem('articlelink', maker) // set maker variable in keyname articlelink
                    var getdata = localStorage.getItem('articlelink') //get keyname articlelink
                    infoWindow.setContent(loc.Name + '<br>' + '<br>' + loc.description + '<br>' + '<br>' + '<div id ="content">' + getdata + '</div>');
                }
                clearTimeout(wikiRequestTimeout);
            }
        });
        return false;
        bounds.extend(position);
    }
}
var ViewModel = function() {

    var self = this;

    //popped up massages after clicking
    self.Locates = function(box1) {
        google.maps.event.trigger(box1.marker, 'click');
    };

    self.query = ko.observable('');

    self.search = ko.computed(function() {
        return ko.utils.arrayFilter(locations, function(point) {
            if (point.Name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0) {
                point.marker.setVisible(true);
                console.log(point);

                return true;
            }
            infoWindow.close();
        });
    });
};

/* Open the drawer when the menu ison is clicked.*/
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
//Resposive design. Sensor for iPhone and Android
function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}
