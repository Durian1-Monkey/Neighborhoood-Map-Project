var bio = [
        'Bangkok, Thailand',
        'Tokyo, Japan',
        'Osaka, Japan',
        'Amsterdam, Nederland',
        'Nicosia, Cyprus'
    ];
//you want to see a map?
/*
var Finder = document.getElementById('map');
Finder.appendChild(googleMap);
*/
$("#map").append(googleMap);


/*Here is the place to make the list which is the default view*/

//var locations = [];
var locationLength = bio.length;
for (var i =0; i < locationLength; i++) {
//    locations.push(bio[i]);

//make list tag
var listMaker = document.createElement('li');
//insert data into list tag
listMaker.innerHTML = bio[i] + '</br>';

// find ul tag
var Finder = document.getElementById('list');
//inside ul tag, append li tag contented location data
Finder.appendChild(listMaker);

}