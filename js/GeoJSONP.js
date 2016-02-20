var bio = ko.observableArray([ 
        'MRT Sukhumvit',
        'BTS Udom suk',
        'BTS Thonglor',
        'MRT Si Lom',
        'BTS Asok']);


    ko.applyBindings(bio);

//jsonData is now a plain JavaScript object in which nothing is observable. 
//It's just data.
var jsonData = ko.toJS(bio);
//Really? Does jsonData is equivalent to JS object? Test it!
    
for (var i=0; i<jsonData.length; i++) {
    console.log(jsonData[i]);
}
//you want to see a map?
/*
var Finder = document.getElementById('map');
Finder.appendChild(googleMap);
*/
$("#map").append(googleMap);
//document.getElementById('map').appendChild(googleMap);
